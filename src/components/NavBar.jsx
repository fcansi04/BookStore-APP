import { Box, Paper, IconButton, InputBase } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Badge } from "@mui/material";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
const NavBar = ({ sepetSize, searchQuery, setSearchQuery }) => {
  const { logout } = useAuth();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 3,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const location = useLocation();
  const isHomePage = location.pathname === "/main";
  return (
    <Box
      sx={{
        height: "80px",
        display: "flex",
        alignItems: "center",
        p: "0 20px",
        gap: "20px",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {isHomePage ? (
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "35%",
            borderRadius: "20px",
          }}
        >
          <IconButton sx={{ p: "5px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "15px" }}
            placeholder="Search Books/ISBN/Author"
            inputProps={{ "aria-label": "search google maps" }}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </Paper>
      ) : (
        <Box sx={{ width: "35%" }}></Box>
      )}
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ cursor: "pointer" }}>
          <MuiLink
            component={RouterLink}
            to="/main/profile"
            sx={{ textDecoration: "none", color: "black" }}
          >
            <AccountCircleIcon sx={{ fontSize: "30px" }} />
          </MuiLink>
        </Box>
        <Box sx={{ cursor: "pointer" }}>
          <MuiLink
            component={RouterLink}
            to="/main/sepetim"
            sx={{ textDecoration: "none", color: "black" }}
          >
            <StyledBadge badgeContent={sepetSize} color="success">
              <ShoppingCartIcon sx={{ fontSize: "30px" }} />
            </StyledBadge>
          </MuiLink>
        </Box>
        <Box sx={{ cursor: "pointer" }}>
          <MuiLink
            component={RouterLink}
            onClick={() => {
              logout();
            }}
            to="/"
            sx={{ textDecoration: "none", color: "black" }}
          >
            <ExitToAppIcon sx={{ fontSize: "30px" }} />
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
