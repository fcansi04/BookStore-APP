import LoginPage from "./components/LoginPage";

import Books from "./components/Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorPage from "./components/ErrorPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Sepetim from "./components/Sepetim";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                errorElement={<ErrorPage />}
                path="/"
                element={<LoginPage />}
              >
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/main" element={<Main />}>
                  <Route path="/main" element={<Books />} />
                  <Route path="/main/profile" element={<Profile />} />
                  <Route path="/main/sepetim" element={<Sepetim />} />
                </Route>
              </Route>
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
