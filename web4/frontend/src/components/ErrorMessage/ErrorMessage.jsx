import PropTypes from "prop-types";
import styles from "./ErrorMessage.module.css"

export default function ErrorMessage({error}) {
    return (
        error
            ? <span className={styles["error-message"]}>{error}</span>
            : <></>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.string
}
