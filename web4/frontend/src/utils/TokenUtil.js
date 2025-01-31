import Cookies from "js-cookie";

function saveTokenToCookies(token, name){
    Cookies.set(name, token, {
        expires: 7,
        sameSite: "Strict",
        path: "/",
    });
}

export default saveTokenToCookies;
