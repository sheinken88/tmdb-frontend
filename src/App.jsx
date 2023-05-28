import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage"
import { SignUp } from "./components/User/SignUp"
import { Login } from "./components/User/Login"
import { MoviePage } from "./pages/MoviePage"
import { Footer } from "./components/Footer";

function App() {


  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element = {<HomePage/>}/>
            <Route path="/signup" element = {<SignUp/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/:movieId" element = {<MoviePage/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
