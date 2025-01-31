import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import RegisterForm from "../../components/Forms/AuthForm/RegisterForm.jsx";
import styles from "./AuthPage.module.css";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import buttonStyles from "../../components/Buttons/Button.module.css";

export default function RegisterPage() {
    const navigate = useNavigate();
    const handleRedirect = (e) => {
        navigate('/login');
    }
    useEffect(() => {
        if (Cookies.get("refreshToken")) {
            navigate("/main");
        }
    }, []);
    return (
        <>
            <Header/>
            <ContentContainer>
                <div className={styles["form-container"]}>
                    <div className={styles["form-header-container"]}>
                        <span>Регистрация</span>
                    </div>
                    <RegisterForm/>
                        <button
                            className={buttonStyles.button1}
                            onClick={handleRedirect}
                        >
                            Уже есть аккаунт? Войти
                        </button>
                </div>
            </ContentContainer>
        </>
    );
}
