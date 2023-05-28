import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import useInput from "../../hooks/useInput";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/react";

import { userRegister } from "../../redux/thunks/userThunks";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useInput();
  const email = useInput();
  const password = useInput();

  const handleRegister = async (e) => {
    e.preventDefault()

    await dispatch(userRegister(userName.value, email.value, password.value))

    navigate("/login")
  }

  return (
    <Box minHeight="100vh">
          <Box 
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.700")}
      maxW="md"
      mx="auto"
      mt="40"
    >
      <form onSubmit={handleRegister}>
        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>UserName</FormLabel>
            <Input {...userName} placeholder="UserName" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input {...email} placeholder="Email" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input {...password} type="password" placeholder="Password" />
          </FormControl>
          <ButtonGroup gap="2">
            <Button type="submit" colorScheme="orange" size="lg" fontSize="md">
              Sign Up
            </Button>
            <Button
              type="button"
              colorScheme="orange"
              size="lg"
              fontSize="md"
              variant="ghost"
              as={Link}
              to="/"
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
    </Box>

  )
}
