import React from "react";
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
import { useState } from "react";
import {
  Link as RouterLink,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import SnackBar from "./SnackBar";
const RegisterForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    username,
    setUsername,
    error,
    setError,
  } = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const person = {
      firstName,
      lastName,
      email,
      phone,
    };
    try {
      setLoading(true);
      const response = await fetch(`${BaseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, person }),
      });
      const data = await response.json();

      if (response.ok) {
        setError(null);
        setOpenSnackBar(true);
        setSnackBarMessage("Başarıyla kayıt oldunuz");
        setSnackBarSeverity("success");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
      if (!response.ok) {
        setError(data.message);
        setOpenSnackBar(true);
        setSnackBarMessage(data.message);
        setSnackBarSeverity("error");
      }
    } catch (err) {
      console.log(err);
      setOpenSnackBar(true);
      setSnackBarMessage(err.message);
      setSnackBarSeverity("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          required
          sx={{ maxWidth: "220px" }}
          id="name"
          label="name"
          variant="outlined"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          sx={{ maxWidth: "220px" }}
          id="surname"
          label="surname"
          variant="outlined"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <TextField
          required
          sx={{ maxWidth: "220px" }}
          id="email"
          label="email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          required
          sx={{ maxWidth: "220px" }}
          id="phone"
          label="phone"
          variant="outlined"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <FormControl sx={{ maxWidth: "220px" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
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
        <TextField
          required
          sx={{ maxWidth: "220px" }}
          id="outlined-basic"
          label="username"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ textAlign: "center", textDecoration: "none" }}
      >
        Hesabınız var mı?{" "}
        <MuiLink
          component={RouterLink}
          sx={{ textDecoration: "none", cursor: "pointer" }}
          to="/"
        >
          Giriş yap
        </MuiLink>
      </Typography>

      <Button
        type="submit"
        sx={{
          height: "40px",
          borderRadius: "15px",
          width: "150px",
          bgcolor: "#000",
          color: "#fff",
          alignSelf: "center",
        }}
        variant="contained"
      >
        {loading ? "Yükleniyor..." : "Üye Ol"}
      </Button>
      <SnackBar
        open={openSnackBar}
        message={snackBarMessage}
        severity={snackBarSeverity}
        setOpen={setOpenSnackBar}
        close={() => setOpenSnackBar(false)}
      />
    </Box>
  );
};

export default RegisterForm;
