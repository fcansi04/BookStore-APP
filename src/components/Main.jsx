import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../axios/api";
const Main = () => {
  const [isTableView, setIsTableView] = useState(false);
  const [sepetSize, setSepetSize] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const [balance, setBalance] = useState(user.balance);
  const [cartItems, setCartItems] = useState([]);
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const fetchCartItems = async () => {
    try {
      const response = await api.post("/getBooksInCart", {
        _id: user._id,
      });
      const data = response.data;
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar balance={balance} setBalance={setBalance} />
      <Box
        sx={{
          width: "100%",
          p: "0 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <NavBar
          sepetSize={sepetSize}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Box sx={{ width: "100%" }}>
          <Outlet
            context={{
              isTableView,
              setIsTableView,
              sepetSize,
              setSepetSize,
              searchQuery,
              setSearchQuery,
              balance,
              setBalance,
              cartItems,
              setCartItems,
              fetchCartItems,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
