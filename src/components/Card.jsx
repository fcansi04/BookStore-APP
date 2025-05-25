import { Box, Typography, Button } from "@mui/material";
import React from "react";

const Card = ({ book }) => {
  return (
    <Box
      sx={{
        width: "190px",
        height: "300px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        p: "2px 5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box
        component="img"
        src={book.bookImg}
        sx={{ width: "100px", height: "120px" }}
      ></Box>
      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
        {book.title}
      </Typography>
      <Typography
        sx={{ fontSize: "14px", fontWeight: "bold", color: "#2C3B77" }}
      >
        {book.author.name}
      </Typography>
      <Typography
        sx={{ fontSize: "14px", fontWeight: "bold", color: "#2C3B77" }}
      >
        {book.publisher}
      </Typography>
      <Typography
        sx={{ fontSize: "14px", fontWeight: "bold", color: "#2C3B77" }}
      >
        {book.format}
      </Typography>
      <Button
        sx={{ width: "70%", height: "25px", bgcolor: "black", color: "white" }}
        variant="contained"
      >
        {book.price} TL
      </Button>
    </Box>
  );
};

export default Card;
