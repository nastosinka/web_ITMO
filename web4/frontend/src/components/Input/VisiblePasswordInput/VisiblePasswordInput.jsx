import PasswordInput from "../PasswordInput.jsx";
import {useState} from "react";
import styles from "./VisiblePasswordInput.module.css"

export default function VisiblePasswordInput({...rest}) {
    const [isShowPassword, setIsShowPassword] = useState(false);

    function handlePasswordChange() {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className={styles["password-input-container"]}>
            <PasswordInput showPassword={isShowPassword} {...rest} />
            <button
                type="button"
                className={`${styles["show-password-button"]} ${isShowPassword ? styles["crossed"] : ""}`}
                onClick={handlePasswordChange}>
            </button>
        </div>
    )
}
