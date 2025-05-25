import { Button } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
const ButtonNames = [
  "BÜTÜN KİTAPLAR",
  "ROMAN",
  "BİLİM KURGU",
  "GERİLİM",
  "DENEMELER",
  "ÖYKÜ",
  "POLİSİYE",
  "ŞİİR",
];

const BookOptionButtons = ({ isTableView, setIsTableView }) => {
  const [selectedButton, setSelectedButton] = useState("BÜTÜN KİTAPLAR");
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        justifyContent: "space-between",
        p: "10px 20px",
        width: "100%",
      }}
    >
      {ButtonNames.map((buttonName) => (
        <Button
          onClick={() => setSelectedButton(buttonName)}
          sx={{
            color: selectedButton === buttonName ? "white" : "black",
            height: "36px",
            border: "1px solid black",
            fontSize: "12px",
            backgroundColor: selectedButton === buttonName ? "black" : "white",
          }}
          key={buttonName}
          variant="outlined"
        >
          {buttonName}
        </Button>
      ))}

      <Button
        sx={{
          marginLeft: "150px",
          backgroundColor: "black",
          height: "36px",
          fontSize: "12px",
        }}
        onClick={() => setIsTableView(!isTableView)}
        variant="contained"
        color="primary"
      >
        {isTableView ? "List View" : "Table View"}
      </Button>
    </Box>
  );
};

export default BookOptionButtons;
