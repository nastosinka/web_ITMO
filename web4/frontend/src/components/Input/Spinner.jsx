import React, { useState, useEffect } from 'react';
import styles from './Input.module.css';

export default function Spinner({
                     id,
                     selectedValue,
                     onChange,
                     min = 0,
                     max = 5,
                     step = 1,
                     validator = (value) => value || true,
                     isRequired = false,
                     ...rest
                 }) {
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        setIsValid(validator(selectedValue));
    }, [validator, selectedValue]);

    return (
        <div className={styles["input-container"]} >
            <input
                className={`
                    ${styles["input-field"]}
                    ${isRequired ? (isValid ? styles["valid-input-field"] : styles["invalid-input-field"]) : ""}
                    ${styles["spinner-input"]}
                `}
                type="number"
                id={id}
                min={min}
                max={max}
                value={selectedValue}
                onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    if (!isNaN(newValue)){
                        onChange(newValue);
                    }
                }}
                {...rest}
            />
        </div>
    );
}
