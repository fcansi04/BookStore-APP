import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SnackBar from "../components/SnackBar";
import { api } from "../axios/api";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setToken(data.token);
      setOpenSnackBar(true);
      setSnackBarMessage("Giriş yapıldı");
      setSnackBarSeverity("success");
      navigate("/main");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Giriş hatası";
      setErrorLogin(errorMessage);
      console.log(err);
      setOpenSnackBar(true);
      setSnackBarMessage(errorMessage);
      setSnackBarSeverity("error");
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        login,
        errorLogin,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
      <SnackBar
        open={openSnackBar}
        message={snackBarMessage}
        severity={snackBarSeverity}
        setOpen={setOpenSnackBar}
        close={() => setOpenSnackBar(false)}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
