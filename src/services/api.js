import axios from "axios";
import { API_URL } from "../../constants/Urls";

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error: ", error);
        return Promise.reject(error);
    }
);

export default api;
