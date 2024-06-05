
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, TextField, Button } from "@mui/material";

const Login = ({ setUserData, setUserToken, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const tokenResponse = await response.json();
      const token = tokenResponse.token;
      setUserToken(token);
      try {
        const userResponse = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = await userResponse.json();
        if (user.id) {
          setUserData(user);
          setIsLoggedIn(true);
          navigate("/books");
        } else {
          alert("Invalid username or password");
        }
      } catch {
        console.error(error.message);
      }
    } catch {
      console.error(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLoginFormSubmit}
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
            Login
          </Button>
          <Button variant="outlined" onClick={() => navigate("/register")}>Register</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
