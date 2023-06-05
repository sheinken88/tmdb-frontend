import {
  ButtonGroup,
  Box,
  IconButton,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      py={{ base: "12", md: "16" }}
      bgColor="#2B2D42"
      width="100%"
    >
      <Stack spacing={{ base: "4", md: "5" }} px={{ base: "4", md: "8" }}>
        <Stack justify="space-between" direction="row" align="center">
          <Heading
            size="xl"
            color="transparent"
            bgGradient="linear(to-r, yellow, red)"
            bgClip="text"
            _hover={{
              cursor: "pointer",
              bgGradient: "linear(to-r, white, orange)",
            }}
          >
            TMDB
          </Heading>
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/sebastian-heinken/"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
              bgColor="white"
              color="black"
              _hover={{ bgColor: "gray.500", color: "black" }}
              _active={{ bgColor: "gray.200", color: "black" }}
            />
            <IconButton
              as="a"
              href="https://github.com/sheinken88"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
              bgColor="white"
              color="black"
              _hover={{ bgColor: "gray.500", color: "black" }}
              _active={{ bgColor: "gray.200", color: "black" }}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="white">
          &copy; {new Date().getFullYear()} Coded by Sebastián Heinken
        </Text>
      </Stack>
    </Box>
  );
};
