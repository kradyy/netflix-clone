import axios from "axios"
import { API_VERSION, API_URL } from "./tmdb"

// Base URL to make requests to the movie database
const instance = axios.create({
    baseURL: `${API_URL}/${API_VERSION}`,
});

export default instance;