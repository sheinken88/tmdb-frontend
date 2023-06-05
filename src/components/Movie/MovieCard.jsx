import { Box, Image, Text, Badge, IconButton, Tooltip } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { addMovieToFavorites } from "../../redux/thunks/userThunks";

export const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleAddToFavorites = () => {
    dispatch(addMovieToFavorites(movie.id));
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
