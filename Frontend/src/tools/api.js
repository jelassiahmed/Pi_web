import axios from "axios";

const api = axios.create({
    baseURL: `https://baazartunisie.herokuapp.com`
});

export default api;