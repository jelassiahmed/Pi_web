import axios from "axios";

const api = axios.create({
    baseURL: `https://baazartn.herokuapp.com`
});

export default api;