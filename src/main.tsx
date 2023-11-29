import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import ReactDOM from "react-dom/client";

import { AuthContextProvider } from "context";

import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 }, mutations: { retry: 1 } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
