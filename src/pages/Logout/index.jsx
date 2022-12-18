import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/user.slice";

const Logout = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    useEffect(() => {
        dispatch(logout());
        nav("/login");
    }, [dispatch, nav]);
    return <div></div>;
};

export default Logout;
