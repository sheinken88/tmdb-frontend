import {
  Box,
  Image,
  Text,
  Badge,
  IconButton,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToFavorites } from "../../redux/thunks/userThunks";

export const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStatus, setAlertStatus] = useState("info");

  const handleAddToFavorites = () => {
    if (isAuthenticated) {
      dispatch(addMovieToFavorites(movie.id));
      setAlertTitle("Successfully added movie to favorites!");
      setAlertStatus("success");
    } else {
      setAlertTitle("You must be logged in to add favorites!");
      setAlertStatus("error");
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
    event.currentTarget.style.cursor = "pointer";
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.cursor = "initial";
  };

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition="transform 0.2s"
    >
      {showAlert && (
        <Alert status={alertStatus} variant="left-accent">
          <AlertIcon />
          <AlertTitle>{alertTitle}</AlertTitle>
        </Alert>
      )}
      <Box position="relative">
        <Tooltip label="Add to favorites">
          <IconButton
            aria-label="Add to favorites"
            icon={<FiHeart />}
            onClick={handleAddToFavorites}
            position="absolute"
            top="5px"
            right="5px"
            colorScheme="red"
          />
        </Tooltip>

        <Badge
          width="35px"
          height="35px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          bg="#FA8128"
          color="black"
          position="absolute"
          bottom="-1rem"
          left="0rem"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.2)"
        >
          {Math.round(movie.vote_average * 10)}%
        </Badge>

        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
        />
      </Box>
      <Box p="6">
        <Box d="flex" alignItems="baseline" textAlign="center" fontSize="m">
          <Text
            mt="1"
            fontWeight="semibold"
            lineHeight="tight"
            color="white"
            isTruncated
          >
            {movie.title}
          </Text>
          <Text
            mt="1"
            fontWeight="semibold"
            lineHeight="tight"
            color="white"
            isTruncated
          >
            {movie.release_date.slice(0, 4)}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
