const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org";
const API_VERSION = 3;

const basePath = "https://image.tmdb.org/t/p/original/";

const endpoints = {
  movies: [
    {
      genre: "Trending",
      title: "Trending",
      url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    },
    {
      genre: "NetflixOriginals",
      title: "Netflix Originals",
      url: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
      orientation: "vertical",
    },
    {
      genre: "TopRated",
      title: "Top Rated",
      url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    },
    {
      genre: "Action",
      title: "Action Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    },
    {
      genre: "Comedy",
      title: "Comedy Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    },
    {
      genre: "Horror",
      title: "Horror Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    },
    {
      genre: "Romance",
      title: "Romance Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    },
    {
      genre: "Documentaries",
      title: "Documentaries",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    },
  ],
  shows: [
    {
      genre: "Trending",
      title: "Trending",
      url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    },
    {
      genre: "NetflixOriginals",
      title: "Netflix Originals",
      url: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
      orientation: "vertical",
    },
    {
      genre: "TopRated",
      title: "Top Rated",
      url: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    },
    {
      genre: "Action",
      title: "Action Shows",
      url: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
    },
    {
      genre: "Comedy",
      title: "Comedy Shows",
      url: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    },
    {
      genre: "Horror",
      title: "Horror Shows",
      url: `/discover/tv?api_key=${API_KEY}&with_genres=27`,
    },
    {
      genre: "Romance",
      title: "Romance Shows",
      url: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
    },
    {
      genre: "Documentaries",
      title: "Documentaries",
      url: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
    },
  ],
};

export { API_VERSION, API_URL, basePath, endpoints };
