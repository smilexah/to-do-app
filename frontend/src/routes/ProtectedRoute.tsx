import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../app/hooks";
import {selectIsAuthenticated, selectUser} from "../app/features/user/userSlice";
import {useEffect} from "react";

function ProtectedRoute() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(selectUser);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace/>
    }

    return (
        <Outlet />
    );
}

export default ProtectedRoute;