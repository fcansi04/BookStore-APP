import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";

import logo from "../assets/lg.png";
import groupImage from "../assets/Group.png";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const values = {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    username,
    setUsername,
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        sx={{ width: "50%", height: "100vh" }}
        src={logo}
        alt="logo"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100px",
            marginBottom: "50px",
            backgroundColor: "black",
            color: "black",
            borderRadius: "10000px",
            padding: "10px",
          }}
          component="img"
          src={groupImage}
          alt="logo"
        />
        <Outlet context={values} />
      </Box>
    </Box>
  );
};

export default LoginPage;
