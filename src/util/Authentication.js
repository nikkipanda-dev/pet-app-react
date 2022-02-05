import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate as Redirect } from "react-router-dom";

export const Authentication = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null);

    const handleAuthentication = () => {
        Cookies.get('x_auth_user') ? setIsAuth(true) : setIsAuth(false);
    }

    useEffect(() => {
        if (isAuth === null) {
            handleAuthentication();
        }
    }, [isAuth])

    return (
        isAuth ? children : <Redirect to='/'/>
    )
};

export default Authentication;