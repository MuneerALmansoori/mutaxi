import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

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

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
