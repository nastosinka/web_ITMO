import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../Input/Input.jsx";
import styles from "./AuthForm.module.css";
import saveTokenToCookies from "../../../utils/TokenUtil.js";
import VisiblePasswordInput from "../../Input/VisiblePasswordInput/VisiblePasswordInput.jsx";
import "../Form.css"
import buttonStyles from "../../Buttons/Button.module.css";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const validateUsername = (value) => value !== "";
    const validatePassword = (value) => value !== "";

    useEffect(() => {
        setErrorMsg("");
    }, [username, password]);

    async function handleSignIn(event) {
        event.preventDefault();

        if (!validateUsername(username) || !validatePassword(password)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        axios
            .post("auth/login", {username: username, password: password})
            .then((response) => {
                saveTokenToCookies(response.data.accessToken, "accessToken");
                saveTokenToCookies(response.data.refreshToken, "refreshToken");
                navigate("/main");
            })
            .catch((error) => {
                if (error.response?.status === StatusCodes.FORBIDDEN)
                    setErrorMsg("Неверный логин или пароль");
                else
                    setErrorMsg("На сервере произошла непредвиденная ошибка");
            });
    }

    return (
        <form onSubmit={handleSignIn} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className="input-container">
                <label htmlFor="login">
                    Логин:
                </label>
                <Input
                    id="login"
                    value={username}
                    onChange={setUsername}
                    placeholder={"Введите логин"}
                    validator={validateUsername}
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="password">
                    Пароль:
                </label>
                <VisiblePasswordInput
                    id="password"
                    value={password}
                    onChange={setPassword}
                    placeholder={"Введите пароль"}
                    validator={validatePassword}
                    isRequired
                />
            </div>
            <button
                className={buttonStyles.button}
                type="submit"
                disabled={!(validateUsername(username) && validatePassword(password))}
            >
                Войти
            </button>
        </form>
    );
}
