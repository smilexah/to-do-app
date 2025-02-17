import {BrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/layout";
import Auth from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import TaskPage from "./pages/TaskPage";
import {useEffect} from "react";
import {useLazyCurrentUserQuery} from "./app/features/user/userApi";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectIsAuthenticated, setUser} from "./app/features/user/userSlice";


const App = () => {
    const dispatch = useAppDispatch();
    const [fetchCurrentUser] = useLazyCurrentUserQuery();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("currentUser");

        if (token && storedUser && storedUser !== "undefined") {
            try {
                const user = JSON.parse(storedUser);
                dispatch(setUser(user));

                fetchCurrentUser().unwrap()
                    .then(response => {
                        if (response.result?.user) {
                            dispatch(setUser(response.result.user));
                        }
                    })
                    .catch(() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("currentUser");
                    });
            } catch (error) {
                console.error("Failed to parse user:", error);
                localStorage.removeItem("currentUser");
            }
        }
    }, [dispatch, fetchCurrentUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<TaskPage />}/>
                        <Route path="users/:id" element={<UserProfilePage/>}/>
                        <Route path="support" element={<div>Support</div>}/>
                    </Route>
                </Route>

                <Route path={"/auth"}>
                    <Route index element={<Navigate to="login" replace />} />
                    <Route path="login" element={<Auth type="login"/>}/>
                    <Route path="register" element={<Auth type="register"/>}/>
                    <Route path="logout" element={<Auth type="logout"/>}/>
                </Route>
            </Routes>
            <Toaster richColors/>
        </BrowserRouter>
    )
}

export default App