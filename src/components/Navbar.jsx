/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. 
You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Button } from "@mui/material";

const LinkTab = (props) => {
  const { label, to, ...other } = props;
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(to);
  };

  return <Tab component="a" onClick={handleClick} label={label} {...other} />;
};

LinkTab.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

const Navbar = ({ isLoggedIn }) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  const navigate = useNavigate();

  const handleAccountOrLogin = () => {
    if (isLoggedIn) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        centered
      >
        <Button onClick={handleAccountOrLogin}>
          {isLoggedIn ? "Account" : "Login"}{" "}
        </Button>
        <LinkTab label="Home" to="/" />
        <LinkTab label="Books" to="/books" />
      </Tabs>
    </Box>
  );
};

export default Navbar;
