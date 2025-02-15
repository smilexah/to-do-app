import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectIsAuthenticated, selectCurrentUser } from "../../app/features/user/userSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const currentUser = useAppSelector(selectCurrentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
        console.log("currentUser:", currentUser);
        console.log("Token in LocalStorage:", localStorage.getItem("token"));
    }, [isAuthenticated, currentUser]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth/login");
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ToDo GO</span>
                </a>

                {/* User Profile Button */}
                {isAuthenticated && currentUser && (
                    <div className="relative">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src={"https://flowbite.com/docs/images/people/profile-picture-3.jpg"}
                                alt="User photo"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{currentUser.Username}</p>
                                </div>
                                <ul className="py-2">
                                    <li>
                                        <button
                                            onClick={() => navigate("/settings")}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        >
                                            Настройки
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-400"
                                        >
                                            Выйти
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
