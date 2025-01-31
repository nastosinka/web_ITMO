import Header from "../../components/Layout/Header.jsx";
import ContentContainer from "../../components/Layout/ContentContainer.jsx";
import LoginForm from "../../components/Forms/AuthForm/LoginForm.jsx";
import Likes from "../../components/Buttons/Likes.jsx";
import styles from "./AuthPage.module.css"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import buttonStyles from "../../components/Buttons/Button.module.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/register');
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
                        <span>Войти</span>
                    </div>
                    <LoginForm/>
                    <button
                        className={buttonStyles.button1}
                        onClick={handleRedirect}
                    >
                        Зарегистрироваться
                    </button>
                    <Likes/>
                </div>
            </ContentContainer>
        </>
    );
}
