import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../redux/thunks/movieThunks";

export const MoviePage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.movies.movieDetails);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [movieId, dispatch]);

  console.log("movieData: ", movieData);

  return <div>{movieData ? movieData.title : "Loading movie data..."}</div>;
};
