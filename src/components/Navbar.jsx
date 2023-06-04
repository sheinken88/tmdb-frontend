import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/thunks/userThunks";
import { searchMovies } from '../redux/thunks/searchThunks';
import useInput from "../hooks/useInput";


import {
  Button,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  Input,
} from "@chakra-ui/react";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useInput()

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(searchMovies(searchInput.value))
    searchInput.current.value = ""
  }

  return (
<>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p="4"
        backgroundColor="#2B2D42"

      >
        <Box p="2">
            <Heading
              as={Link} 
              to="/"
              size="xl"
              color="transparent"
              bgGradient="linear(to-r, white, orange)"
              bgClip="text"
            >
              TMDB
            </Heading>
        </Box>
        <Flex ml="40" gap="8">
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Movies
            </MenuButton>
            <MenuList>
              <MenuItem>
                Popular
              </MenuItem>
              <MenuItem>
                Upcoming
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Tv shows
            </MenuButton>
            <MenuList>
              <MenuItem>
                Popular
              </MenuItem>
              <MenuItem>
                Top Rated
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Spacer />
        <Box mr={10}>
          <form
            onSubmit={handleOnSubmit}
          >
            <Flex>
              <Input
                placeholder="Search"
                variant="filled"
                size="md"
                borderRadius="full"
                bg="white"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                _focus={{ boxShadow: "lg", color: "white" }}
                value={searchInput.value}
                onChange={searchInput.onChange}
              />
              <Button
                type="submit"
                size="md"
                ml={2}
                px={8}
                borderRadius="full"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
              >
                Search
              </Button>
            </Flex>
          </form>
        </Box>
        {isAuthenticated ? (
          <Menu>
            <MenuButton fontSize="2xl" color="white">
              {userData.userName}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/">
                Account
              </MenuItem>
              <MenuItem as={Link} to="/">
                My list
              </MenuItem>
              <MenuDivider />
              <MenuItem as={Link} to="/" onClick={handleLogout} >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup gap="2">

              <Button as={Link} to="/signup" colorScheme="orange" variant="outline">
                Sign Up
              </Button>


              <Button as={Link} to="/login" colorScheme="orange">Log in</Button>

          </ButtonGroup>
        )}
      </Flex>
    </>
  )
}