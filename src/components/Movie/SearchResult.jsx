
import { MovieCard } from "./MovieCard";
import { Box, SimpleGrid } from "@chakra-ui/react"


export const SearchResult = ({movies}) => {
    return (
        <Box maxW="7xl" mx="auto" pt={5} px={{ base: '6', md: '8' }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '6', md: '8' }}>
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
          </SimpleGrid>
        </Box>
      )
}


