import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";
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

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const [key, setKey] = useState(0);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            withCredentials: true,
          }
        );
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
      {alert.showAlert && (
        <Box position="fixed" bottom={5} left={5} maxW="md" zIndex={1000}>
          <Alert status={alert.alertStatus}>
            <AlertIcon />
            <AlertDescription>{alert.alertTitle}</AlertDescription>
          </Alert>
        </Box>
      )}
    </>
  );
}

export default App;
