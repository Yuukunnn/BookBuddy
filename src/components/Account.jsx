import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Divider, Box } from "@mui/material";

const Account = ({ userData, reservedBooks, setReservedBooks, userToken }) => {
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("reserbedBooks: ", reservedBooks);
  }, [reservedBooks]);

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
        setReservedBooks(result.reservation);
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
        method: "DELETE",
      }
    )
      .then(() => {
        setTrigger(!trigger);
      })
      .catch((err) => console.error(err));
  };

  const style = {
    py: 2,
    width: "100%",
    maxWidth: 1000,
    borderRadius: 4,
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    marginTop:"50px",
    justifyContent:"center"

  };

  return (
    <>
      {Object.keys(userData).length > 0 ? (

<Box
sx={{
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '90vh'
}}
>
        <List sx={style}>
          <ListItem>
            <ListItemText primary={`First Name: ${userData.firstname}`} />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText primary={`Last Name: ${userData.lastname}`} />
          </ListItem>
          <Divider component="li" />

          <ListItem>
            <ListItemText primary={`Email: ${userData.email}`} />
          </ListItem>
          <Divider component="li" />

          {reservedBooks?.length > 0 &&
            reservedBooks.map((reservedBook) => (
              <>
                <ListItem>
                  <ListItemText primary={`Books in reading:  ${reservedBook.title}`} sx={{fontStyle:"italic", color:"black"}}/>
                  <Button onClick={() => handleReturnBook(reservedBook.id)}>
                    Return
                  </Button>
                </ListItem>
                <Divider component="li" />
              </>
            ))}
        </List>

        </Box>
      ) : (
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      )}
    </>
  );
};

export default Account;
