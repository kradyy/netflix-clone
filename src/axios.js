import axios from "axios"
import axiosLocalStorageAdapter from 'axios-localstorage-adapter';
import { API_VERSION, API_URL } from "./tmdb"

const api = axios.create({
    baseURL: `${API_URL}/${API_VERSION}`,
    adapter: axiosLocalStorageAdapter({
        maxAge: 60 * 60 * 3
    })
});


export default api;