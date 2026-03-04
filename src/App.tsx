import React from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import RolesPage from "./pages/Roles";
import Login from "./pages/Login";
import TripsPage from "./pages/Trips";
import OpsPage from "./pages/Ops";
import PassengersPage from "./pages/Passengers";
import ApiDocsPage from "./pages/ApiDocs";
import DriversPage from "./pages/Drivers";
import SettingsPage from "./pages/Settings";
import VehiclesPage from "./pages/Vehicles";

export default function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleLogin = (newToken: string, newUser: any) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    window.history.pushState({}, "", "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    window.history.pushState({}, "", "/login");
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPath) {
      case "/": return <Dashboard />;
      case "/users": return <UsersPage />;
      case "/roles": return <RolesPage />;
      case "/trips": return <TripsPage />;
      case "/drivers": return <DriversPage />;
      case "/vehicles": return <VehiclesPage />;
      case "/ops": return <OpsPage />;
      case "/passengers": return <PassengersPage />;
      case "/api-docs": return <ApiDocsPage />;
      case "/settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  // Simple router simulation for demo
  React.useEffect(() => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      // @ts-ignore
      originalPushState.apply(window.history, arguments);
      window.dispatchEvent(new Event("popstate"));
    };
  }, []);

  return (
    <Layout user={user} onLogout={handleLogout}>
      {renderPage()}
    </Layout>
  );
}
