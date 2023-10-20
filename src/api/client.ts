import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:3000"

export const client = axios.create({
    baseURL: BASE_URL,
    validateStatus(status) {
        return true;
    },
})