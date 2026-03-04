import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

app.use(express.json());

// --- Middleware ---

const authenticate = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: { include: { permissions: { include: { permission: true } } } } },
    });
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const checkPermission = (permissionKey: string) => {
  return (req: any, res: any, next: any) => {
    const hasPermission = req.user.role.permissions.some(
      (p: any) => p.permission.key === permissionKey
    );
    if (!hasPermission) return res.status(403).json({ error: "Forbidden" });
    next();
  };
};

const logAudit = async (actorId: string, action: string, resource: string, details: any, req: any) => {
  await prisma.auditLog.create({
    data: {
      actorId,
      action,
      resource,
      details: JSON.stringify(details),
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    },
  });
};

// --- API Routes ---

app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role.name } });
});

app.get("/api/v1/me", authenticate, (req: any, res) => {
  res.json(req.user);
});

// Dashboard Stats
app.get("/api/v1/stats", authenticate, async (req, res) => {
  const [userCount, tripCount, driverCount, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.trip.count(),
    prisma.driver.count(),
    prisma.ledgerEntry.aggregate({ _sum: { amount: true }, where: { type: "CREDIT" } }),
  ]);

  res.json({
    users: userCount,
    trips: tripCount,
    drivers: driverCount,
    revenue: totalRevenue._sum.amount || 0,
  });
});

// Users CRUD
app.get("/api/v1/users", authenticate, checkPermission("users:read"), async (req, res) => {
  const users = await prisma.user.findMany({ include: { role: true, tenant: true } });
  res.json(users);
});

// Drivers CRUD
app.get("/api/v1/drivers", authenticate, async (req, res) => {
  const drivers = await prisma.driver.findMany({ include: { vehicle: true } });
  res.json(drivers);
});

// Trips CRUD
app.get("/api/v1/trips", authenticate, async (req, res) => {
  const trips = await prisma.trip.findMany({ include: { driver: true } });
  res.json(trips);
});

// Audit Logs
app.get("/api/v1/audit-logs", authenticate, checkPermission("audit:read"), async (req, res) => {
  const logs = await prisma.auditLog.findMany({ include: { actor: true }, orderBy: { createdAt: "desc" } });
  res.json(logs);
});

// --- Seed Data Endpoint (For Demo) ---
app.post("/api/v1/seed", async (req, res) => {
  try {
    // Create Permissions
    const perms = ["users:read", "users:write", "audit:read", "finance:read", "ops:read"];
    for (const p of perms) {
      await prisma.permission.upsert({ where: { key: p }, update: {}, create: { key: p } });
    }

    // Create Roles
    const adminRole = await prisma.role.upsert({
      where: { name: "Super Admin" },
      update: {},
      create: { name: "Super Admin" },
    });

    // Link Permissions to Admin
    const allPerms = await prisma.permission.findMany();
    for (const p of allPerms) {
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: p.id },
      });
    }

    // Create Super Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.upsert({
      where: { email: "admin@uberops.com" },
      update: {},
      create: {
        email: "admin@uberops.com",
        password: hashedPassword,
        name: "System Owner",
        roleId: adminRole.id,
      },
    });

    res.json({ message: "Seeded successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --- Vite Integration ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
