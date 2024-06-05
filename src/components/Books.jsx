import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Paper, Grid, ButtonBase, Button, Box } from "@mui/material";
import { styled } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Books = ({ userToken, isLoggedIn }) => {
  const [books, setBooks] = useState([]);
  const [targetName, setTargetName] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [trigger, setTrigger] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = () => {
      fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setBooks(result.books);
          setFilteredBooks(result.books);
        })
        .catch(console.error);
    };
    getBooks();
  }, [trigger]);

  const handleSearchClick = () => {
    if (targetName.trim() === "") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter((book) => {
          const bookString = (book.title + book.author).toLowerCase();
          return bookString.includes(targetName);
        })
      );
    }
  };

  const handleCheckOutBook = (bookId) => {
    fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          available: false,
        }),
      }
    )
      .then(() => {
        setTrigger(!trigger);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
<Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        marginTop: "25px",
        fontSize: "36px",
      }}
    >
      <Box
        component="input"
        type="text"
        placeholder="Search by book name"
        value={targetName}
        onChange={(event) => setTargetName(event.target.value)}
        sx={{
          padding: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '300px',
          fontSize: '16px',
        }}
      />
      <Button
        onClick={handleSearchClick}
        variant="contained"
        color="primary"
        sx={{
          padding: '12px 20px',
          fontSize: '16px',
          textTransform: 'none', // Keeps the text case as is
        }}
      >
        Search
      </Button>
    </Box>

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          marginTop: 5,
          padding: 4,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        {filteredBooks.map((book) => (
          <Grid
            container
            spacing={10}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Grid item>
              <ButtonBase sx={{ width: 160, height: 200 }}>
                <Img
                  alt={book.title}
                  src={book.coverimage}
                  width="140"
                  height="180"
                  onClick={() => navigate(`/books/${book.id}`)}
                />
              </ButtonBase>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    onClick={() => navigate(`/books/${book.id}`)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    Title: {book.title}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    Author: {book.author}
                  </Typography>

                  {isLoggedIn && (
                    <Button
                      disabled={book.available === false}
                      onClick={() => handleCheckOutBook(book.id)}
                      item
                      sx={{ border: "1px solid lightgrey" }}
                    >
                      {" "}
                      Check Out
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
};

export default Books;
