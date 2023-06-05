import { useEffect } from "react"
import { Box, VStack, Heading } from "@chakra-ui/react"
import { MovieList } from "../components/Movie/MovieList";
import { SearchResult } from "../components/Movie/SearchResult"
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies, fetchUpcomingMovies, fetchTopRatedMovies } from "../redux/thunks/movieThunks"

export const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector(state => state.movies.popularMovies);
  const upcomingMovies = useSelector(state => state.movies.upcomingMovies);
  const topRatedMovies = useSelector(state => state.movies.topRatedMovies);
  const searchResults = useSelector(state => state.search.searchResults)

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  return (
    <Box minHeight="100vh" bgGradient="linear(to-br, #1C1D29, #2B2D42)">
      <VStack spacing={10}>
        <Heading color="white">Most Popular</Heading>
        <MovieList movies={popularMovies} />

        <Heading color="white">Top Rated</Heading>
        <MovieList movies={topRatedMovies} />

        <Heading color="white">Upcoming</Heading>
        <MovieList movies={upcomingMovies} />

        <Heading color="white">Search Results</Heading>
        <SearchResult movies={searchResults} />
      </VStack>
    </Box>
  )
}
