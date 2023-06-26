import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/thunks/userThunks";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
  VStack,
  MenuDivider,
  Divider,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const HamburgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="blue"
        aria-label="Open Menu"
        variant="outline"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="#2B2D42">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" color="white">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              <Button
                onClick={() => {
                  navigate("/?category=popular");
                  onClose();
                }}
                w="full"
                background="none"
                color="white"
                _hover={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                }}
              >
                Popular
              </Button>
              <Button
                onClick={() => {
                  navigate("/?category=topRated");
                  onClose();
                }}
                w="full"
                background="none"
                color="white"
                _hover={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                }}
              >
                Top Rated
              </Button>
              <Button
                onClick={() => {
                  navigate("/?category=upcoming");
                  onClose();
                }}
                w="full"
                background="none"
                color="white"
                _hover={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                }}
              >
                Upcoming
              </Button>
              <Divider />
              {isAuthenticated ? (
                <>
                  <Button
                    w="full"
                    colorScheme="orange"
                    onClick={() => {
                      navigate("/favorites");
                      onClose();
                    }}
                  >
                    My list
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                    w="full"
                  >
                    Log out
                  </Button>
                  <Divider />
                  <Text color="white" alignSelf="center" fontStyle="italic">
                    {userData.userName}
                  </Text>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/login"
                    w="full"
                    onClick={onClose}
                    colorScheme="orange"
                  >
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    w="full"
                    onClick={onClose}
                    colorScheme="orange"
                    variant="outline"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
