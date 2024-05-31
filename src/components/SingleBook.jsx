/* TODO - add your code to create a functional React component that renders details for a single book. 
Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
/* APT: `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${number}`  */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBook = () => {
  const [singleBook, setSingleBook] = useState({});
  const { bookId } = useParams();


  useEffect(() => {
    const fetchSingleBook = () => {
      fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((response) => response.json())
        .then((result) => {
          setSingleBook(result.book);
        })
        .catch(console.error);
    };
    fetchSingleBook();
  }, [bookId]);

  return (
    <div className="Single_Book_Container">
        <img src ={singleBook.coverimage} alt={singleBook.title} />
        <ul>
          <li>Title: {singleBook.title}</li>
          <li>Author: {singleBook.author}</li>
          <li>Description: {singleBook.description}</li>
          <li>Available: {singleBook.coverimage ? 'Yes' : 'No'}</li>
        </ul>
    </div>
  );
};


export default SingleBook;