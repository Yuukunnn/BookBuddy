/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. 
Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
/* API: https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const Navigate = useNavigate();

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
        })
        .catch(console.error);
    };
    getBooks();
  }, []);


  return (
    <div className="Books_Container">
      {books.map((book) => (
        <div>
          <img src={book.coverimage} alt={book.title} className="Book_Pic" />
          <div className="Book_Details">
            <p onClick={()=>Navigate(`/books/${book.id}`)}>Title: {book.title}</p>
            <p>Author: {book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Books;
