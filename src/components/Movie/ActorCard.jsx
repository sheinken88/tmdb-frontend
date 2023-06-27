import { Box, Image, Text } from "@chakra-ui/react";

export const ActorCard = ({ actor }) => {
  return (
    <Box borderRadius="lg" overflow="hidden">
      <Image
        src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
        alt={actor.name}
      />
      <Box p="6">
        <Box d="flex" alignItems="baseline" textAlign="center" fontSize="m">
          <Text mt="1" fontWeight="semibold" lineHeight="tight" color="white">
            {actor.name}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
