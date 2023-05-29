import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage"
import { SignUp } from "./components/User/SignUp"
import { Login } from "./components/User/Login"
import { MoviePage } from "./pages/MoviePage"
import { Footer } from "./components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/userSlice";
import axios from "axios";
import * as settings from "./settings"

function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const user = await axios.get(`${settings.axiosURL}/users/me`);
      await dispatch(login(user.data));
    }
    fetchUser();
  }, []);


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
