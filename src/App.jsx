import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { SignUp } from "./components/User/SignUp";
import { Login } from "./components/User/Login";
import { MoviePage } from "./pages/MoviePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { Footer } from "./components/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/userSlice";
import axios from "axios";
import * as settings from "./settings";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${settings.axiosURL}/users/me`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch(login(response.data));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar setKey={setKey} />
        <Routes>
          <Route path="/" element={<HomePage key={key} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:movieId" element={<MoviePage />} />
          <Route
            path="/favorites"
            element={
              isAuthenticated ? <FavoritesPage /> : <Navigate to="/login" />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
