import "@mantine/core/styles.css";

import {
  MantineProvider,
  Paper,
  localStorageColorSchemeManager,
} from "@mantine/core";
import { Layout } from "./layout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Users } from "./pages/users";
import { NotFoundTitle } from "./pages/error";
import { Login } from "./pages/auth";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "my-app-color-scheme",
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
      defaultColorScheme="light"
    >
      <Paper>
        <RouterProvider router={router} />
      </Paper>
    </MantineProvider>
  );
}
