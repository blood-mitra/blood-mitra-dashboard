import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Header } from "./header/AppHeaderTab";
import { Navbar } from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const [opened] = useDisclosure();

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
