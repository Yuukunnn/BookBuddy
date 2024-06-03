/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          navigate("/");
        } else {
            alert("Invalid username or password")
        }
      } catch {
        console.error(error.message);
      }
    } catch {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleLoginFormSubmit}>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </label>

      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </label>

      <button type="submit">Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </form>
  );
};

export default Login;
