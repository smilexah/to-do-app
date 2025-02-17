import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { userApi } from "./userApi";
import { authApi } from "../auth/authApi";
import type { User } from "../../../types/User";

interface InitialState {
    user: User | null;
    isAuthenticated: boolean;
    users: User[] | null;
    currentUser: User | null;
    token?: string;
}

let initialState: InitialState = {
    user: null,
    isAuthenticated: !!localStorage.getItem("token"),
    users: [],
    currentUser: (() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Failed to parse currentUser from localStorage:", error);
            return null;
        }
    })(),
    token: localStorage.getItem("token") || undefined,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            return {
                ...initialState,
                isAuthenticated: false,
                token: undefined,
                currentUser: null,
            };
        },
        resetUser: (state) => {
            state.user = null;
        },
        resetToken: (state, action: PayloadAction<{ token: string }>) => {
            console.log("resetTokenAction", action);
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                const token = action.payload.result.token;
                const user = action.payload.result.user as User;
                localStorage.setItem("token", token);
                localStorage.setItem("currentUser", JSON.stringify(user));

                state.token = token;
                state.currentUser = user;
                state.isAuthenticated = true;
            })
            .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
                if (action.payload.result.user) {
                    localStorage.setItem("currentUser", JSON.stringify(action.payload.result.user));
                    state.currentUser = action.payload.result.user;
                    state.isAuthenticated = true;
                }
            })
            .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
                const token = action.payload.result.token;
                localStorage.setItem("token", token);
                state.token = token;
                state.isAuthenticated = true;
            });
    }
});

export const { logout, resetUser, resetToken, setUser } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUser = (state: RootState) => state.user.user;