import React from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import groupImage from "../assets/Group.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DrawIcon from "@mui/icons-material/Draw";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
const SideBar = ({ balance, setBalance }) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "280px",
        height: "100vh",
        position: "sticky",
        top: "0",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        pt: "20px",
        pb: "200px",
      }}
    >
      <Box
        sx={{
          width: "80px",
          height: "80px",
          cursor: "pointer",
          borderRadius: "10000px",
          padding: "10px",
          border: "1px solid white",
        }}
        component="img"
        src={groupImage}
        alt="logo"
        onClick={() => navigate("/main")}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/main/sepetim")}
        >
          <ShoppingCartIcon sx={{ fontSize: "24px", color: "white" }} /> Sepetim
        </Box>
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/main")}
        >
          <AutoStoriesIcon sx={{ fontSize: "24px", color: "white" }} /> Okuma
          Listem
        </Box>
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          <FavoriteIcon sx={{ fontSize: "24px", color: "white" }} />
          Favorilerim
        </Box>
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          <DrawIcon sx={{ fontSize: "24px", color: "white" }} />
          Yazarlar
        </Box>
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          <AccountBalanceWalletIcon sx={{ fontSize: "24px", color: "white" }} />
          Cüzdan {balance.toFixed(2)} TL
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
