import { useEffect } from "react";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../redux/thunks/userThunks";
import { MovieCard } from "../components/Movie/MovieCard";

export const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  console.log("FAVORITES: ", favorites);

  return (
    <Box
      maxW="100%"
      minHeight="100vh"
      mx="auto"
      pt={5}
      px={{ base: "6", md: "8" }}
      backgroundColor="#232535"
    >
      <Heading color="white" mb={10}>
        Favorites
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 6 }} spacing={{ base: "6", md: "8" }}>
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
