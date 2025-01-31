import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch} from "react-redux";
import {setIsDataLoaded} from "../../redux/HistorySlice.js";
import {setRadius} from "../../redux/RadiusSlice.js";
import axios from "axios";
import styles from "./Button.module.css";

export default function LogOutButton() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogOut() {
        try {
            await axios.post("auth/logout", {"token": Cookies.get("refreshToken")});
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            dispatch(setIsDataLoaded(false));
            dispatch(setRadius(1));
            navigate("/login");
        } catch (error) {
            navigate("/error");
        }
    }

    return (
        <button className={styles.button} onClick={handleLogOut}>
            <span>Выйти</span>
        </button>
    );
}
