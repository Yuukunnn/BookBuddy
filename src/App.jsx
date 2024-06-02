import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Account from "./components/Account";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Register from "./components/Register";
import Login from "./components/Login";


function App() {

const [userData, setUserData] = useState({});
const [userToken, setUserToken] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>

    <Navbar  isLoggedIn={isLoggedIn}/>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/account' element={<Account userData={userData} />}></Route>
      <Route path='/books' element={<Books userToken={userToken} setUserData={setUserData}/>}></Route>
      <Route path='/books/:bookId' element={<SingleBook />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login setUserData={setUserData} setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn}/>}></Route>
    </Routes>

    </div>
  )
}

export default App
