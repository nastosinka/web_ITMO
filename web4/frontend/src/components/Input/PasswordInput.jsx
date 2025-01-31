import Input from "./Input.jsx";
import PropTypes from "prop-types";

export default function PasswordInput({ showPassword, ...rest }) {
    const inputType = showPassword ? "text" : "password";
    return <Input type={inputType} {...rest} />;
}

PasswordInput.propTypes = {
    showPassword: PropTypes.bool,
};
