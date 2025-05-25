import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useOutletContext } from "react-router-dom";
const LoginForm = () => {
  const { email, setEmail, password, setPassword, error, setError } =
    useOutletContext();

  const {
    user,
    loading,
    token,
    login,
    logout,
    isAuthenticated,
    errorLogin,
    setErrorLogin,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({ email, password });

    try {
      await login(email, password);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
      variant="outlined"
    >
      <TextField
        required
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ width: "40%" }}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <FormControl sx={{ width: "40%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Typography variant="body2" color="text.secondary">
        Hesabınız yok mu?{" "}
        <MuiLink
          component={RouterLink}
          to="/register"
          sx={{ textDecoration: "none" }}
        >
          Üye ol
        </MuiLink>
      </Typography>
      {error && (
        <Typography variant="body2" color="error">
          {error.message}
        </Typography>
      )}

      <Button
        type="submit"
        sx={{
          height: "40px",
          borderRadius: "15px",
          width: "150px",
          bgcolor: "#000",
          color: "#fff",
        }}
        variant="contained"
      >
        {loading ? "Giriş yapılıyor..." : "Giriş yap"}
      </Button>
    </Box>
  );
};

export default LoginForm;
