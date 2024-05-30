import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Account from "./components/Account";
import Books from "./components/Books";


function App() {
  return (
    <div>

    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/account' element={<Account />}></Route>
      <Route path='/books' element={<Books />}></Route>
    </Routes>

    </div>
  )
}

export default App
