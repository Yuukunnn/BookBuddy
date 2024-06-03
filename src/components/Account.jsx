/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. 
You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Account = ({ userData, reservedBooks, setReservedBooks, userToken }) => {

const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setReservedBooks(result.reservation)
      })
      .catch(console.error);
  }, [trigger]);

  const handleReturnBook = (reservationId) => {
    fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        method: "DELETE"
      }
    )
      .then(() => {
        setTrigger(!trigger);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <p>First Name: {userData.firstname}</p>
      <p>Last Name: {userData.lastname}</p>
      <p>Email: {userData.email}</p>
      <p>
        Books:{" "}
        {reservedBooks.length > 0 &&
          reservedBooks.map((reservedBook) => (
            <div>
              <h5>{reservedBook.title}</h5>
              <button onClick={()=>handleReturnBook(reservedBook.id)}>Return</button>
            </div>
          ))}
      </p>
    </div>
  );
};

export default Account;
