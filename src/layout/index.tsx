import { AppShell } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import { useContext } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../context";

import { Header } from "./header/AppHeaderTab";

import { Navbar } from "./navbar/Navbar";

export const Layout = () => {
  const [opened] = useDisclosure();

  const location = useLocation();

  const { token } = useContext(AuthContext);

  if (!token?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AppShell
      header={{ height: 73 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
