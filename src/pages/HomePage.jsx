import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MovieList } from "../components/Movie/MovieList";
import { SearchResult } from "../components/Movie/SearchResult";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../redux/thunks/movieThunks";
import { clearSearch } from "../redux/slices/searchSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const searchResults = useSelector((state) => state.search.searchResults);
  const searchActivated = useSelector((state) => state.search.searchActivated);

  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("popular");

  const bgImageOverlay = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.6)"
  );

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  useEffect(() => {
    if (upcomingMovies.length > 0 && featuredMovie === null) {
      const randomMovie =
        upcomingMovies[Math.floor(Math.random() * upcomingMovies.length)];
      setFeaturedMovie(randomMovie);
    }
  }, [upcomingMovies]);

  useEffect(() => {
    if (
      categoryFromURL &&
      ["popular", "upcoming", "topRated"].includes(categoryFromURL)
    ) {
      setSelectedCategory(categoryFromURL);
      setCurrentPage(1);
    } else {
      setSelectedCategory("popular");
    }
    dispatch(fetchPopularMovies(currentPage));
    dispatch(fetchTopRatedMovies(currentPage));
    dispatch(fetchUpcomingMovies(currentPage));
    dispatch(clearSearch(currentPage));
  }, [dispatch, categoryFromURL, currentPage, selectedCategory]);

  const loadMoreMovies = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    if (selectedCategory === "popular") {
      dispatch(fetchPopularMovies(nextPage));
    } else if (selectedCategory === "topRated") {
      dispatch(fetchTopRatedMovies(nextPage));
    } else if (selectedCategory === "upcoming") {
      dispatch(fetchUpcomingMovies(nextPage));
    }
  };

  let moviesToDisplay;
  switch (selectedCategory) {
    case "popular":
      moviesToDisplay = popularMovies;
      break;
    case "topRated":
      moviesToDisplay = topRatedMovies;
      break;
    case "upcoming":
      moviesToDisplay = upcomingMovies;
      break;
    default:
      moviesToDisplay = [];
  }

  return (
    <Box
      minHeight="100vh"
      paddingTop={10}
      bgGradient="linear(to-br, #1C1D29, #2B2D42)"
      position="relative"
    >
      <VStack spacing={10}>
        {!searchActivated && featuredMovie && (
          <Box
            width={{ base: "100%", md: "66%" }}
            height={{ base: "300px", md: "500px" }}
            py={5}
            px={{ base: "4", md: "8" }}
            zIndex="999"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `radial-gradient(ellipse at center, transparent, ${bgImageOverlay}, #1E1F2C), url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box p={10} color="white" position="relative" zIndex="2">
              <Heading marginBottom={10}>{featuredMovie.title}</Heading>
              <Text marginBottom={10} display={{ base: "none", md: "block" }}>
                {featuredMovie.overview}
              </Text>
              <Button
                bgColor="white"
                color="#1D1E2A"
                onClick={() => navigate(`/${featuredMovie.id}`)}
              >
                View
              </Button>
            </Box>
          </Box>
        )}

        {searchActivated ? (
          <>
            <Heading color="white">Search Results</Heading>
            <SearchResult movies={searchResults} />
          </>
        ) : (
          <>
            <Heading textAlign="start" color="white" paddingTop={20}>
              {selectedCategory}
            </Heading>
            <MovieList movies={moviesToDisplay} />
            <Button
              bgColor="white"
              color="#1D1E2A"
              onClick={loadMoreMovies}
              disabled={moviesToDisplay.length === 0}
            >
              Load More
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};
