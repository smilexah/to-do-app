import {BrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Toaster} from "sonner";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/layout/layout";
import Auth from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import TaskPage from "./pages/TaskPage";


const App = () => {
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