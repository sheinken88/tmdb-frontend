import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../redux/thunks/movieThunks";
import { fetchMovieActors } from "../redux/thunks/movieThunks";
import { addMovieToFavorites } from "../redux/thunks/userThunks";
import { showAlert, hideAlert } from "../redux/slices/alertSlice";
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { MovieCarousel } from "../components/Movie/MovieCarousel";
import { ActorCarousel } from "../components/Movie/ActorCarousel";

export const MoviePage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.movieDetails);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const similarMoviesData = useSelector((state) => state.movies.similarMovies);
  const movieActorsData = useSelector((state) => state.movies.movieActors);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchMovieActors(movieId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [movieId]);

  const handleAddToFavorites = () => {
    if (isAuthenticated) {
      dispatch(addMovieToFavorites(movieId));
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
    <>
      <Box pos="relative" minHeight="60vh" bgColor="#232535">
        <Box
          pos="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movieData.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
            zIndex: 1,
          }}
        />
        <Box p={[5, 20]} style={{ zIndex: 2, position: "relative" }}>
          <Flex direction={["column", "row"]} gap={10}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
              alt={movieData.original_title}
              width={["100%", "300px"]}
            />

            <Flex gap={5} direction="column">
              <Flex gap={5}>
                <Heading color="white" fontSize={["xl", "2xl"]}>
                  {movieData.original_title}
                </Heading>
                <Text fontSize={["lg", "3xl"]} color="white">
                  ({movieData.release_date.slice(0, 4)})
                </Text>
              </Flex>
              <Flex gap={2} flexWrap="wrap">
                {movieData.genres.map((genre) => (
                  <Text key={genre.id} color="white">
                    {genre.name} /
                  </Text>
                ))}
              </Flex>
              <Flex gap={5} alignItems="center" mt={[4, 0]}>
                <Badge
                  width={["40px", "50px"]}
                  height={["40px", "50px"]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  backgroundImage="linear-gradient(45deg, #FA8128, #FAAE28)"
                  color="#232939"
                  fontSize={["md", "lg"]}
                  fontWeight="bold"
                  boxShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
                >
                  {Math.round(movieData.vote_average * 10)}%
                </Badge>
                <Tooltip label={"Add to favorites"}>
                  <IconButton
                    aria-label={"Add to favorites"}
                    icon={<FiHeart />}
                    onClick={handleAddToFavorites}
                    bgColor="#2B2D42"
                    color="white"
                    borderRadius="full"
                    size="lg"
                  />
                </Tooltip>
              </Flex>
              <Text fontSize={["lg", "3xl"]} color="white" mt={5}>
                Overview
              </Text>
              <Text color="white">{movieData.overview}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box bgColor="#232535" padding={20}>
        <Heading mb={10} color="white">
          Cast
        </Heading>
        <ActorCarousel actors={movieActorsData} />
      </Box>
      <Box bgColor="#232535" padding={20}>
        <Heading mb={10} color="white">
          Recommended
        </Heading>
        <MovieCarousel movies={similarMoviesData} />
      </Box>
    </>
  );
};
