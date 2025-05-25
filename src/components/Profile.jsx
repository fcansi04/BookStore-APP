import { Box, TextField, Button, Typography } from "@mui/material";

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  console.table(user);
  const [firstName, setFirstName] = useState(user.person.firstName);
  const [lastName, setLastName] = useState(user.person.lastName);
  const [email, setEmail] = useState(user.person.email);
  const [phone, setPhone] = useState(user.person.phone);
  const [isUpdated, setIsUpdated] = useState(false);
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BaseUrl}/updateUserInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          user: {
            email,
            firstName,
            lastName,
            phone,
          },
        }),
      });
      const body = await response.json();
      setIsUpdated(body.message);
      console.log(body.message);
      if (!response.ok) {
        throw new Error("Failed to update user info");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            person: {
              ...user.person,
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
            },
          })
        );
        setTimeout(() => {
          setIsUpdated(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",

        p: "20px",
      }}
    >
      <Box sx={{ width: "300px" }}>
        <Box component="h2" sx={{ fontWeight: "bold", mb: "20px" }}>
          Kişisel Bilgilerim
        </Box>
        <Box
          component="form"
          onSubmit={updateUser}
          sx={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <TextField
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="name"
            label="Adınız"
            variant="outlined"
          />
          <TextField
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            label="Soyadınız"
            variant="outlined"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="E-posta Adresi"
            variant="outlined"
          />
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            label="Cep Telefonu"
            variant="outlined"
          />
          <Button
            type="submit"
            sx={{ borderRadius: "10px", backgroundColor: "#000", mt: "10px" }}
            variant="contained"
            color="primary"
          >
            BİLGİLERİMİ GÜNCELLE
          </Button>
          <Typography variant="body1" color="success">
            {isUpdated ? "Bilgileriniz Güncellendi" : ""}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <Box component="h2" sx={{ fontWeight: "bold", mb: "20px" }}>
          Şifre Güncelleme
        </Box>
        <TextField
          id="currentPassword"
          label="Mevcut Şifreniz"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="newPassword"
          label="Yeni Şifreniz"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="confirmPassword"
          label="Yeni Şifreniz"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          sx={{ borderRadius: "10px", backgroundColor: "#000", mt: "10px" }}
          variant="contained"
          color="primary"
        >
          ŞİFRE GÜNCELLE
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
