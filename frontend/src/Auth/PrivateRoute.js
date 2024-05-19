import { Navigate, Outlet } from "react-router"
import { useAuth } from "./useAuth"

export default function PrivateRoute() {
    const { user } = useAuth();
    console.log(user);
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    )
}
