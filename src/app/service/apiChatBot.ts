import axios from "axios";

const apiBot = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 50000,
    headers: {
        "Content-Type": "application/json"
    }
});

apiBot.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiBot;
