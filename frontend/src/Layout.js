import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./Auth/useAuth";
import { useLocalStorage } from "./Auth/useLocalStorage";
import Menu from "./Components/Menu";

export default function Layout() {
    const { user } = useAuth();
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();
    useEffect(() => {
        if (!getItem("user")) {
            navigate('/login');
        }
    }, [user]);

    return (<> <Menu /> <hr /> <Outlet /></>);
}
