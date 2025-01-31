import axiosUtil from "../../utils/AxiosUtil.js";
import {loadPoints} from "../../utils/ServerDataLoadUtil.js";
import {useDispatch} from "react-redux";
import styles from "./Button.module.css";

export default function CleanTableButton() {
    const dispatch = useDispatch();
    async function handleTableClean() {
        await axiosUtil.post("main/remove-points");
        await loadPoints(dispatch);
    }

    return (
        <button className={styles.button} onClick={handleTableClean}>
            <span>Очистить таблицу</span>
        </button>
    );
}
