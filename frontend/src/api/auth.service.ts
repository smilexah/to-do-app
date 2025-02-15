import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username: string, password: string) => {
    return axios.post(API_URL + "register", {
        username,
        password,
    });
};

const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "login", {
            username,
            password,
        })
        .then((response: any) => {
            if (response.data.username) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "logout").then((response: any) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(<string>localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;