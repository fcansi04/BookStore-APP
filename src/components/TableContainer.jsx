import React, { use } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Box,
  Button,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useAuth } from "../contexts/AuthContext";
import SnackBar from "./SnackBar";
import { api } from "../axios/api";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("bookImg", {
    header: "Book",
    cell: (info) => {
      const imgURL = info.getValue();
      if (imgURL) {
        return (
          <Box
            component="img"
            sx={{ width: "100px", height: "120px" }}
            src={imgURL}
            alt="kitap resmi"
          />
        );
      } else {
        return <Box>görsel yok</Box>;
      }
    },
    enableSorting: false,
    enableFiltering: false,
  }),
  columnHelper.accessor("title", {
    header: "title",
    enableSorting: false,
    enableFiltering: false,
  }),
  columnHelper.accessor("author.name", {
    header: "Author",
    enableSorting: false,
    enableFiltering: false,
  }),
  columnHelper.accessor("publisher", {
    header: "Publisher",
    enableSorting: false,
    enableFiltering: false,
  }),
  columnHelper.accessor("price", {
    header: "Price",

    enableSorting: true,
    enableFiltering: true,
  }),
  columnHelper.display({
    id: "ekle",
    header: "Sepete Ekle",
    cell: (info) => {
      const book = info.row.original;
      const { user } = useAuth();
      const {
        setOpenSnackBar,
        setSnackBarMessage,
        setSnackBarSeverity,
        cartItems,
        setCartItems,
        fetchCartItems,
      } = info.table.options.meta;

      return (
        <Button
          onClick={async () => {
            try {
              const BaseUrl = import.meta.env.VITE_BASE_URL;
              const response = await api.post("/addItemToCart", {
                _id: user._id,
                book,
              });

              setSnackBarMessage("Ürün başarıyla sepete eklendi!");
              setSnackBarSeverity("success");
              setOpenSnackBar(true);
              fetchCartItems();

              const data = response.data;
              console.log(data);
            } catch (error) {
              console.log(error);
              setSnackBarMessage("Bir hata oluştu: " + data.message);
              setSnackBarSeverity("error");
              setOpenSnackBar(true);
              console.log(response.status);
            }
          }}
          variant="contained"
          color="success"
          sx={{ width: "100px" }}
          disabled={cartItems.some((item) => item.ISBN === book.ISBN)}
        >
          {cartItems.some((item) => item.ISBN === book.ISBN)
            ? "Eklendi"
            : "Ekle"}
        </Button>
      );
    },
  }),
];

const TableContainer = ({
  books,
  isTableView,
  cartItems,
  setCartItems,
  fetchCartItems,
}) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("success");

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: books,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    meta: {
      setOpenSnackBar,
      setSnackBarMessage,
      setSnackBarSeverity,
      cartItems,
      setCartItems,
      fetchCartItems,
    },
  });
  return (
    <Box sx={{ display: isTableView ? "block" : "none" }}>
      <Table
        sx={{ width: "100%", tableLayout: "fixed" }}
        aria-label="simple table"
      >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                let width = "auto";
                if (header.id === "bookImg") width = "15%";
                else if (header.id === "title") width = "30%";
                else if (header.id === "author_name") width = "20%";
                else if (header.id === "publisher") width = "15%";
                else if (header.id === "price") width = "10%";
                else if (header.id === "ekle") width = "10%";

                return (
                  <TableCell
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    sx={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                      fontWeight: "bold",
                      width: width,
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() ?? null] ?? null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SnackBar
        message={snackBarMessage}
        open={openSnackBar}
        close={handleCloseSnackBar}
        severity={snackBarSeverity}
      />
    </Box>
  );
};

export default TableContainer;
