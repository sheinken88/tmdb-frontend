import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../redux/thunks/movieThunks";
import { Box, Center, Flex, Heading, Image, VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

export const MoviePage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.movieDetails);
  const similarMoviesData = useSelector((state) => state.movies.similarMovies);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("hola");

    dispatch(fetchMovieDetails(movieId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    return () => {
      console.log("Unmounted");
    };
  }, [movieId]);

  if (loading) {
    return (
      <Box minHeight="100vh" bgColor="#242535">
        <Center>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Center>
      </Box>
    );
  }

  return (
    <Box height="100vh" bgColor="#232535">
      <Box p={20}>
        <Flex justify="center">
          <Image
            src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
            alt={movieData.original_title}
            width="200px"
          />

          <Heading color="white">{movieData.original_title}</Heading>
        </Flex>
      </Box>
    </Box>
  );
};
