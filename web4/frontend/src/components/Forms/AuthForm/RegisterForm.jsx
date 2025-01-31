import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import Input from "../../Input/Input.jsx";
import styles from "./AuthForm.module.css"
import saveTokenToCookies from "../../../utils/TokenUtil.js";
import ShowAblePasswordInput from "../../Input/VisiblePasswordInput/VisiblePasswordInput.jsx";
import "../Form.css"
import buttonStyles from "../../Buttons/Button.module.css";

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate()

    const validateUsername = (value) => LOGIN_REGEX.test(value);
    const validatePwd = (value) => PWD_REGEX.test(value);
    const validatePwdConfirm = (value) => pwd === value && validatePwd(pwd);

    useEffect(() => {
        setErrorMsg("");
    }, [username, pwd, pwdConfirm]);

    async function handleSignUp(event) {
        event.preventDefault();

        if (!validateUsername(username) ||
            !validatePwd(pwd) ||
            !validatePwdConfirm(pwdConfirm)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        try {
            const response = await axios
                .post("auth/register", {
                    username: username,
                    password: pwd
                });
            saveTokenToCookies(response.data.accessToken, "accessToken");
            saveTokenToCookies(response.data.refreshToken, "refreshToken");
            navigate("/main");
        } catch (error) {
            if (error.response?.status === StatusCodes.CONFLICT)
                setErrorMsg("Имя пользователя занято");
            else
                setErrorMsg("На сервере произошла непредвиденная ошибка");
        }
    }

    return (
        <form onSubmit={handleSignUp} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className="input-container">
                <label htmlFor="username">
                    Логин:
                </label>
                <Input
                    id="username"
                    value={username}
                    onChange={setUsername}
                    placeholder={"Введите логин"}
                    validator={validateUsername}
                    tip="4-24 символа. Первый символ - буква. Разрешены латинские буквы и цифры."
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwd">
                    Пароль:
                </label>
                <ShowAblePasswordInput
                    id="pwd"
                    value={pwd}
                    onChange={setPwd}
                    placeholder={"Введите пароль"}
                    validator={validatePwd}
                    tip="8-24 символа. Должен включать заглавные, строчные буквы, цифры и спецсимволы (!@#$%)."
                    isRequired
                />
            </div>
            <div className="input-container">
                <label htmlFor="pwdConfirm">
                    Повторите пароль:
                </label>
                <ShowAblePasswordInput
                    id="pwdConfirm"
                    value={pwdConfirm}
                    onChange={setPwdConfirm}
                    placeholder={"Повторите пароль"}
                    validator={validatePwdConfirm}
                    tip="Пароли должны совпадать."
                    isRequired
                />
            </div>
            <button
                className={buttonStyles.button}
                type="submit"
                disabled={!(validateUsername(username) && validatePwd(pwd) && validatePwdConfirm(pwdConfirm))}
            >
                Зарегистрироваться
            </button>
        </form>
    );
}
