import { Box, Paper, Typography, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackBar from "./SnackBar";
import { useOutletContext } from "react-router-dom";
const columns = [
  {
    field: "ISBN",
    renderHeader: () => (
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        ISBN
      </Typography>
    ),
    width: 180,
  },
  {
    field: "bookImg",
    renderHeader: () => (
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        Ürün
      </Typography>
    ),
    width: 200,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "100px",
            maxHeight: "150px",
            objectFit: "contain",
          }}
          src={params.value}
          alt="Kitap Kapağı"
        />
      </Box>
    ),
  },
  {
    field: "title",
    renderHeader: () => (
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        Ürün Adı
      </Typography>
    ),
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "20px",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {params.value}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography sx={{ fontSize: "12px" }}>
            {params.row.category}
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>{params.row.name}</Typography>
          <Typography sx={{ fontSize: "12px" }}>{params.row.format}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: "price",
    renderHeader: () => (
      <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
        Fiyat
      </Typography>
    ),
    type: "number",
    headerAlign: "center",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
          {params.value}
        </Typography>
        <Typography
          sx={{ fontSize: "16px", fontWeight: "bold", marginLeft: "5px" }}
        >
          TL
        </Typography>
      </Box>
    ),
    width: 100,
  },
];

const Sepetim = () => {
  const { user } = useAuth();
  const { cartItems, setCartItems, fetchCartItems } = useOutletContext();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const { balance, setBalance } = useOutletContext();
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const [rowSelectionModel, setRowSelectionModel] = useState({
    type: "include",
    ids: new Set(),
  });
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
    );
  }, [cartItems]);

  const handleOrder = async () => {
    if (balance < totalPrice) {
      setSnackBarSeverity("error");
      setSnackBarMessage("Cüzdanınızda yeterince para yok");
      setOpenSnackBar(true);
      return;
    } else if (totalPrice == 0) {
      setSnackBarSeverity("error");
      setSnackBarMessage("Sepetinizde ürün yok");
      setOpenSnackBar(true);
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/buyBooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          totalPrice: totalPrice,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setOpenSnackBar(true);
        setSnackBarSeverity("success");
        setSnackBarMessage("Siparişiniz başarıyla oluşturuldu");
        fetchCartItems();
        setBalance(balance - totalPrice);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            balance: balance,
          })
        );
      } else {
        setOpenSnackBar(true);
        setSnackBarSeverity("error");
        setSnackBarMessage("Bir hata oluştu");
        console.log(data);
      }
    } catch (error) {
      setSnackBarSeverity("error");
      console.log(error);
      setOpenSnackBar(true);
      setSnackBarMessage("Bir hata oluştu");
    }
  };

  const handleDeleteFromCard = async () => {
    try {
      const response = await fetch(`${BaseUrl}/removeBookFromCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          books: Array.from(rowSelectionModel.ids),
        }),
      });
      if (response.ok) {
        setSnackBarSeverity("success");
        fetchCartItems();
      } else {
        setSnackBarSeverity("error");
      }

      const data = await response.json();
      setOpenSnackBar(true);
      setSnackBarMessage(data.message);
    } catch (error) {
      setSnackBarSeverity("error");
      console.log(error);
      setOpenSnackBar(true);
      setSnackBarMessage("Bir hata oluştu");
    }
  };

  const rows = cartItems.map((item, index) => ({
    id: item._id,
    ISBN: item.ISBN,
    bookImg: item.bookImg,
    title: item.title,
    price: item.price,
    category: item.category,
    name: item.author.name,
    format: item.format,
  }));

  return (
    <Box sx={{ display: "flex", gap: "30px" }}>
      <Box sx={{ width: "70%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", fontSize: "25px" }}
          >
            Sepetim
          </Typography>
        </Box>
        <Paper sx={{ height: "560px", width: "100%", marginTop: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={160}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            sx={{ border: 0 }}
            loading={loading}
          />
        </Paper>
        <Button
          component="label"
          variant="outlined"
          sx={{ padding: "10px", marginTop: "10px" }}
          startIcon={<DeleteIcon />}
          onClick={() => {
            if (rowSelectionModel.ids.size > 0) {
              handleDeleteFromCard();
            } else {
              setSnackBarSeverity("error");
              setSnackBarMessage("Seçilen ürün yok");
              setOpenSnackBar(true);
            }
          }}
        >
          Seçili Ürünleri Sil
        </Button>
        <SnackBar
          open={openSnackBar}
          message={snackBarMessage}
          severity={snackBarSeverity}
          setOpen={setOpenSnackBar}
          close={() => setOpenSnackBar(false)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
          mt: 2,
          width: "22%",
          height: "200px",
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: 18, fontWeight: "bold", color: "#444" }}
        >
          Sipariş Özeti
        </Typography>
        <Typography sx={{ borderBottom: "1px solid #ccc" }}>
          {cartItems.length} ürün
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="span">Ödenecek Tutar:</Typography>
          <Typography
            component="span"
            sx={{ marginLeft: "5px", fontWeight: "bold", color: "green" }}
          >
            {totalPrice}
            TL
          </Typography>
        </Box>
        <Button onClick={handleOrder} variant="contained" color="success">
          Sipariş Ver
        </Button>
      </Box>
    </Box>
  );
};

export default Sepetim;
