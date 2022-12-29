import api from "../axios";
import { genreEndpoints } from "../tmdb";

export const getAllGenres = async () => {
  var genres = [];
  
  for (const endpoint of Object.keys(genreEndpoints)) {
    const url = genreEndpoints[endpoint];

    var response = await api.get(url);

    if (response.data) {
      genres[endpoint] = response.data.genres;
    }
  }

  return genres;
};

export const getGenresNames = async (genreType, video) => {
  var genres = await getAllGenres();

  if(!genres[genreType]) {
    return [];
  } 

  return genres[genreType].filter((genre) => video.genre_ids.includes(genre.id)).map((genre) => genre.name);
}