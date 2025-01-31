import React, { useState, useEffect } from 'react';
import buttonGroupStyles from "./ButtonGroup.module.css";
import styles from '../Input.module.css';

export default function ButtonGroup({
                         id,
                         selectedValue,
                         onChange,
                         values,
                         validator = (value) => value || true,
                         isRequired = false,
                         ...rest
                     }) {
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(validator(selectedValue));
    }, [selectedValue, validator]);

    const handleButtonClick = (value) => {
        onChange(value);
    };

    return (
        <div
            className={`
                ${styles["button-group"]} 
                ${isRequired ? (isValid ? styles["valid-input-field"]
                                        : styles["invalid-input-field"]) : ""}`}
            id={id}
            {...rest}
        >
            {values.map((value, index) => (
                <button
                    key={index}
                    type="button"
                    className={buttonGroupStyles.button}
                    onClick={() => handleButtonClick(value)}
                >
                    {value}
                </button>
            ))}
        </div>
    );
}
