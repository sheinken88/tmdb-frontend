import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/thunks/userThunks";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { loginError, clearError } from "../../redux/slices/userSlice";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Alert,
  AlertIcon,
  Heading,
} from "@chakra-ui/react";

export const Login = () => {
  const email = useInput();
  const password = useInput();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.error) {
      setShowAlert(true);
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timeout);
    } else if (user.isAuthenticated) {
      setShowAlert(false);
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.value && password.value) {
      dispatch(clearError());
    }
    dispatch(userLogin(email.value, password.value))
      .then(() => {
        dispatch(clearError());
      })
      .catch((error) => {
        dispatch(loginError(error.message));
      });
  };

  return (
    <Box minHeight="100vh" bgColor="#242636" paddingTop={20}>
      <Heading color="white" textAlign="center" mb="10">
        Login
      </Heading>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue("white", "gray.700")}
        maxW="md"
        mx="auto"
      >
        {showAlert && (
          <Alert status="error" mb={5}>
            <AlertIcon />
            {user.error}
          </Alert>
        )}
        <form onSubmit={handleLogin}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" {...email} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" {...password} />
            </FormControl>
            <Button
              type="submit"
              backgroundColor="#3498DB"
              color="white"
              size="lg"
              fontSize="md"
            >
              Login
            </Button>
            <Button
              type="button"
              color="gray"
              size="xs"
              fontSize="md"
              variant="ghost"
              as={Link}
              to="/"
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
