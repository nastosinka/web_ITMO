import axios from "axios";
import {StatusCodes} from "http-status-codes";
import Cookies from "js-cookie";
import saveTokenToCookies from "./TokenUtil.js";

axios.defaults.baseURL = "http://localhost:8080/api";

const axiosUtil = axios.create();

async function refreshAccessToken() {
    if (!Cookies.get("refreshToken")) return null;
    const response = await axios.post("/auth/refresh-token", {
        "token": Cookies.get("refreshToken")
    });
    const newAccessToken = response.data.token;
    Cookies.remove("accessToken");
    saveTokenToCookies(newAccessToken, "accessToken");
    return newAccessToken;
}

axiosUtil.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    }, (error) => {
        window.location.href = "/";
        return Promise.reject(error);
    }
);

axiosUtil.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === StatusCodes.FORBIDDEN && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshAccessToken();
                if(!newToken){
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    window.location.href = "/login";
                    return;
                }
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosUtil(originalRequest);
            } catch (refreshError) {
                if (refreshError?.status === StatusCodes.FORBIDDEN) {
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    window.location.href = "/login";
                } else
                    window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }
        window.location.href = "/";
        return Promise.reject(error);
    }
);

export default axiosUtil;
