import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ActorCard } from "./ActorCard";
import { Box } from "@chakra-ui/react";

export const ActorCarousel = ({ actors }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} itemClass="carousel-item-padding-40-px">
      {actors.map((actor) => (
        <Box maxW="200px" maxH="400px" key={actor.id}>
          <ActorCard actor={actor} />
        </Box>
      ))}
    </Carousel>
  );
};
