import PropTypes from "prop-types";
import styles from "./Input.module.css"
import {useEffect, useState} from "react";

export default function Input({
                   id,
                   type = "text",
                   placeholder = "",
                   value,
                   onChange,
                   validator = (value) => value || true,
                   tip = "",
                   isRequired = false,
                   ...rest
               }) {

    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(validator(value));
    }, [value, validator]);

    return (
        <div className={styles["input-container"]}>
            <input
                className={`
                    ${styles["input-field"]}
                    ${isRequired ? (isValid ? styles["valid-input-field"] : styles["invalid-input-field"]) : ""}
                `}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />
            {isFocused && !isValid && value && tip && (
                <p className={styles["input-tip"]}>{tip}</p>
            )}
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    validator: PropTypes.func,
    tip: PropTypes.string,
    isRequired: PropTypes.bool,
};
