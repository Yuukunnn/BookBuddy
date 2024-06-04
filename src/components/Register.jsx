/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const createUser = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
          }),
        }
      )
      navigate('/login');

    } catch {
      console.error("error:", error);
    }
  };

  return (
    <Box
    component="form"
    onSubmit={handleRegisterFormSubmit}
    sx={{
      width: '100%',
      height: '91vh',
      marginTop: '3%',
      display: 'flex',
      justifyContent:'center', alignItems:'center',
      backgroundImage: 'url(/src/assets/311lxF-GHbL._AC_UF894,1000_QL80_.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    noValidate
  >
    <Grid container direction="column" spacing={4} justifyContent='center' alignItems='center'
    sx={{
      marginBottom: '150px',
      width: '25%',
      height: '80%'
    }}
    >
      <Grid container item direction='column' sx={{ gap: '10px'}}>
        <TextField
          variant="outlined"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      

      <Grid container item justifyContent='center' sx={{ gap: '20px' }}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  </Box>

  );
};

export default Register;
