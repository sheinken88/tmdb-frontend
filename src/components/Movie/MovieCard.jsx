import { Box, Image, Text, Badge, IconButton, Tooltip } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovieToFavorites,
  removeMovieFromFavorites,
} from "../../redux/thunks/userThunks";
import { Link } from "react-router-dom";
import { showAlert, hideAlert } from "../../redux/slices/alertSlice";

export const MovieCard = ({ movie, isFavoritePage }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleAddToFavorites = () => {
    if (isAuthenticated) {
      dispatch(addMovieToFavorites(movie.id));
      dispatch(
        showAlert({
          title: "Successfully added movie to favorites!",
          status: "success",
        })
      );
    } else {
      dispatch(
        showAlert({
          title: "You must be logged in to add favorites!",
          status: "error",
        })
      );
    }
    setTimeout(() => dispatch(hideAlert()), 3000);
  };

  const handleRemoveFromFavorites = () => {
    if (isAuthenticated) {
      dispatch(removeMovieFromFavorites(movie.id));
      dispatch(
        showAlert({
          title: "Successfully removed movie from favorites!",
          status: "success",
        })
      );
    }

    setTimeout(() => dispatch(hideAlert()), 3000);
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
      <Box position="relative">
        <Tooltip
          label={isFavoritePage ? "Remove from favorites" : "Add to favorites"}
        >
          <IconButton
            aria-label={
              isFavoritePage ? "Remove from favorites" : "Add to favorites"
            }
            icon={isFavoritePage ? <AiFillDelete /> : <FiHeart />}
            onClick={
              isFavoritePage ? handleRemoveFromFavorites : handleAddToFavorites
            }
            position="absolute"
            top="5px"
            right="5px"
            colorScheme={isFavoritePage ? "gray" : "red"}
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
        <Box as={Link} to={`/${movie.id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </Box>
      </Box>
      <Box p="6">
        <Box d="flex" alignItems="baseline" textAlign="center" fontSize="m">
          <Text mt="1" fontWeight="semibold" lineHeight="tight" color="white">
            {movie.original_title}
          </Text>
          <Text
            mt="1"
            fontWeight="semibold"
            lineHeight="tight"
            color="white"
            isTruncated
          >
            {movie.release_date ? movie.release_date.slice(0, 4) : "No Date"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
