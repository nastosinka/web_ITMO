import styles from "./Layout.module.css"
import PropTypes from "prop-types";

export default function ContentContainer({children}){
    return(
        <div className={styles["content-container"]}>
            {children}
        </div>
    )
}

ContentContainer.propTypes = {
    children: PropTypes.node
};
