import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { DashboardPage } from "./pages/DashboardPage";
import { ServerGuard } from "./guards/ServerGuard";
import { AppProvider } from "./context/AppContext";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./routes/AuthRoute";
import { LoginPage } from "./pages/LoginPage";
import { TokenPage } from "./pages/TokenPage";
import { SaveTokenPage } from "./pages/SaveTokenPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ServerGuard>
          <BrowserRouter basename=".">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/token" element={<TokenPage />} />
              <Route path="/redirect" element={<SaveTokenPage />} />
            </Routes>
          </BrowserRouter>
        </ServerGuard>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
