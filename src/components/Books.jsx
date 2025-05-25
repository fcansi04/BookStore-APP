import {
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  Typography,
} from "@mui/material";
import React from "react";
import BookOptionButtons from "./BookOptionButtons";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/api";
import Card from "./Card";
import TableContainer from "./TableContainer";
import { useState, useEffect, useMemo } from "react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Debounce Hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Books = () => {
  const [currentBooks, setCurrentBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const { cartItems, setCartItems, fetchCartItems } = useOutletContext();
  const { isTableView, setIsTableView, searchQuery, setSearchQuery } =
    useOutletContext();
  const { user } = useAuth();

  // Debounce uygulanmış arama sorgusu - reduced to 300ms for better responsiveness
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const BookPerPage =
    debouncedSearchQuery && debouncedSearchQuery.length >= 5
      ? 1000
      : debouncedSearchQuery.length >= 3
      ? 100
      : debouncedSearchQuery.length == 2
      ? 60
      : debouncedSearchQuery.length == 1
      ? 40
      : 15;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { data, isLoading, isError, error, isFetching, isPreviousData } =
    useQuery({
      queryKey: ["books", currentPage, BookPerPage, debouncedSearchQuery],
      queryFn: getBooks,
      keepPreviousData: true,
      placeholderData: (previousData) => previousData,
    });

  // Memoize filtered books to prevent unnecessary re-filtering
  const books = data?.data || [];

  const searchBooks = useMemo(() => {
    if (searchQuery.length === 0) {
      return books;
    }

    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.ISBN.toLowerCase().includes(query) ||
        book.author.name.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);
  const totalPages = data?.totalPages || 1;

  if (isLoading) {
    return <Box>Kitaplar yükleniyor... Lütfen bekleyin.</Box>;
  }
  if (isError) {
    console.log("Durum: Hata oluştu...", error);
    return (
      <Box>
        Cardlar Yüklenirken bir hata oluştu oluştu. Lütfen daha sonra tekrar
        deneyin.
      </Box>
    );
  }

  console.log(
    `Durum: Veri Yüklendi. Gösterilen card sayısı: ${searchBooks.length}. Toplam Sayfa: ${totalPages}`
  );

  const noBook = !searchBooks || searchBooks.length === 0;

  return (
    <>
      {noBook ? (
        <Typography>Gösterilecek kitap bulunamadı.</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <BookOptionButtons
            isTableView={isTableView}
            setIsTableView={setIsTableView}
          />
          <Box
            sx={{
              flexWrap: "wrap",
              gap: "13px",
              display: isTableView ? "none" : "flex",
            }}
          >
            {searchBooks.map((book) => (
              <Card key={book._id} book={book} />
            ))}
          </Box>
          <TableContainer
            isTableView={isTableView}
            books={searchBooks}
            cartItems={cartItems}
            setCartItems={setCartItems}
            fetchCartItems={fetchCartItems}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          p: "20px 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            shape="rounded"
            variant="outlined"
            color="primary"
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Books;
