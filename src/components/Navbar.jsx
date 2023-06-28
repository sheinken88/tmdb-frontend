import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/thunks/userThunks";
import { searchMovies } from "../redux/thunks/searchThunks";
import { HamburgerMenu } from "./HamburguerMenu";
import { useMediaQuery } from "@chakra-ui/react";
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

export const Navbar = ({ setKey }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useInput();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovies(searchInput.value));
    searchInput.setValue("");
  };

  return (
    <>
      <Flex
        minWidth="100%"
        alignItems="center"
        gap="2"
        p="4"
        backgroundColor="#2B2D42"
      >
        <Box p="2">
          <Heading
            size="xl"
            color="transparent"
            bgGradient="linear(to-r, white, orange)"
            bgClip="text"
            _hover={{
              cursor: "pointer",
              bgGradient: "linear(to-r, yellow, red)",
            }}
            onClick={() => {
              navigate("/");
              setKey((prevKey) => prevKey + 1);
            }}
          >
            TMDB
          </Heading>
        </Box>

        {isLargerThan768 ? (
          <>
            <Flex ml="40" gap="8">
              <Menu>
                <MenuButton
                  fontSize="lg"
                  color="white"
                  _hover={{
                    fontSize: "xl",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  onClick={() => navigate("/?category=popular")}
                >
                  Popular
                </MenuButton>
                <MenuButton
                  fontSize="lg"
                  color="white"
                  _hover={{
                    fontSize: "xl",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  onClick={() => navigate("/?category=topRated")}
                >
                  Top Rated
                </MenuButton>
                <MenuButton
                  fontSize="lg"
                  color="white"
                  _hover={{
                    fontSize: "xl",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    outline: "none",
                  }}
                  onClick={() => navigate("/?category=upcoming")}
                >
                  Upcoming
                </MenuButton>
              </Menu>
            </Flex>

            <Spacer />

            <Box mr={10}>
              <form onSubmit={handleOnSubmit}>
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
              <Menu position="relative">
                <Menu position="relative">
                  <MenuButton fontSize="2xl" color="white">
                    {userData.userName}
                  </MenuButton>
                  <MenuList zIndex="1000" bg="#2B2D42">
                    <MenuItem
                      as={Link}
                      to="/favorites"
                      bg="#2B2D42"
                      color="white"
                    >
                      My list
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      bg="#2B2D42"
                      color="white"
                      as={Link}
                      to="/"
                      onClick={handleLogout}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Menu>
            ) : (
              <ButtonGroup gap="2">
                <Button
                  as={Link}
                  to="/signup"
                  colorScheme="orange"
                  variant="outline"
                >
                  Sign Up
                </Button>

                <Button as={Link} to="/login" colorScheme="orange">
                  Log in
                </Button>
              </ButtonGroup>
            )}
          </>
        ) : (
          <Spacer />
        )}

        {!isLargerThan768 && <HamburgerMenu />}
      </Flex>
    </>
  );
};
