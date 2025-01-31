import axiosUtil from "./AxiosUtil.js";
import {setHistory, setIsDataLoaded} from "../redux/HistorySlice.js";
import {setUsername} from "../redux/UserSlice.js";
import Cookies from "js-cookie";

export function loadPoints(dispatch, navigate, page, size) {
    axiosUtil
        .get("main/get-points", {
            params: {
                page: page,
                size: size
            }
        })
        .then((response) => {
            const {points, currentPage, size} = response.data;
            dispatch(setHistory(points));
            dispatch(setIsDataLoaded(true));
        })
        .catch((_) => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            navigate("/");
        });
}

export function loadUserData(dispatch, navigate) {
    axiosUtil
        .get("main/get-user-profile-data")
        .then((response) => {
            dispatch(setUsername(response.data.username));
            dispatch(setIsDataLoaded(true));
        })
        .catch((_) => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            navigate("/");
        });
}
