import { Box, Image, Text, Button } from '@chakra-ui/react'

export const MovieCard = ({ movie }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Text
            mt="2"
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="tight"
            isTruncated>
            {movie.title}
          </Text>
        </Box>
        <Button colorScheme="teal" variant="outline" width="full" mt={4}>
          View Details
        </Button>
      </Box>
    </Box>
  )
}
