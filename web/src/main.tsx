import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import UserProvider from "./context/UserContext.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";
import { client } from "./lib/react-query.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={client}>
      <UserProvider>
        <App />
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  </ThemeProvider>,
);
