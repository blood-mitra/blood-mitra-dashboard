import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import {
  MantineColorsTuple,
  MantineProvider,
  Paper,
  createTheme,
  localStorageColorSchemeManager,
} from "@mantine/core";

import { Layout } from "./layout";

import { Notifications } from "@mantine/notifications";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./pages/dashboard";
import { Users } from "./pages/users";
import { NotFoundTitle } from "./pages/error";
import { Login } from "./pages/auth";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "blood-mitra-color-scheme",
});

const brandColor: MantineColorsTuple = [
  "#ffe8e8",
  "#ffd1d1",
  "#fba1a1",
  "#f66d6d",
  "#f24242",
  "#f02626",
  "#f11618",
  "#d6050c",
  "#c00009",
  "#a80004",
];

const theme = createTheme({
  primaryColor: "brandColor",
  colors: {
    brandColor,
  },
});

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "*",
          element: <NotFoundTitle />,
        },
      ],
      errorElement: <NotFoundTitle />,
    },
    { path: "/login", element: <Login />, errorElement: <NotFoundTitle /> },
  ]);

  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="dark"
      theme={theme}
    >
      <Paper>
        <Notifications position="top-right" />
        <RouterProvider router={router} />
      </Paper>
    </MantineProvider>
  );
}
