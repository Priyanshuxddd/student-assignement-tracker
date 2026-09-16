import axios from "axios";

const api = axios.create({
    baseURL: "https://student-assignement-tracker-6.onrender.com/api",
    timeout: 60_000,
})

export default api;
