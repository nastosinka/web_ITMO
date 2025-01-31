import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from "./PointForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {setRadius} from "../../../redux/RadiusSlice.js";
import ErrorMessage from "../../ErrorMessage/ErrorMessage.jsx";
import buttonStyles from "../../Buttons/Button.module.css";
import "../Form.css";
import ButtonGroup from "../../Input/ButtonGroup/ButtonGroup";
import Spinner from "../../Input/Spinner";

export default function PointForm({pointChecker}) {
    const radius = useSelector((state) => state.radiusReducer.radius);
    const dispatch = useDispatch();

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [r, setR] = useState(radius);

    const [errorMsg, setErrorMsg] = useState("");

    const xValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
    const rValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

    const validateX = (value) => xValues.includes(value);
    const validateR = (value) => rValues.includes(value) && Number(value) > 0;
    const validateY = (value) => -5 <= Number(value) <= 3;

    useEffect(() => {
        setErrorMsg("");
    },[x, y, r]);

    function handleRadiusChange(value) {
        setR(Number(value));
        dispatch(setRadius(Number(value) > 0 ? Number(value) : 0));
    }

    function handleXChange(value) {
        setX(Number(value));
    }

    function handleYChange(value) {
        setY(Number(value));
    }

    function submitForm(event) {
        event.preventDefault();

        if(!validateX(x) || !validateY(y) || !validateR(r)) {
            setErrorMsg("Данные не валидны");
            return;
        }

        pointChecker(x, y, r);
    }

    return (
        <form onSubmit={submitForm} className={styles["form"]}>
            <ErrorMessage error={errorMsg}/>
            <div className="input-container">
                <label htmlFor="x">
                    X: {x}
                </label>
                <ButtonGroup
                    id="x"
                    selectedValue={x}
                    onChange={handleXChange}
                    values={xValues}
                    isRequired={true}
                    validator={validateX}
                />
            </div>
            <div className="input-container">
                <label htmlFor="y">
                    Y:
                </label>
                <Spinner
                    id="y"
                    value={y}
                    onChange={handleYChange}
                    min={-5}
                    max={3}
                    step={1}
                    validator={validateY}
                    isRequired={true}
                />
            </div>
            <div className="input-container">
                <label htmlFor="r">
                    R: {r}
                </label>
                <ButtonGroup
                    id="r"
                    selectedValue={r}
                    onChange={handleRadiusChange}
                    values={rValues}
                    validator={validateR}
                    isRequired={true}
                />
            </div>
            <button className={buttonStyles.button}
                    type="submit"
                    disabled={!validateX(x) || !validateY(y)|| !validateR(r)}>
                Проверить
            </button>
        </form>
    );
}

PointForm.propTypes = {
    pointChecker: PropTypes.func,
}
