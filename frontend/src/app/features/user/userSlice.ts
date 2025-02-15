import { createSlice } from "@reduxjs/toolkit";
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
    currentUser: null,
    token: localStorage.getItem("token") || undefined,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            return {
                ...initialState,
                isAuthenticated: false,
                token: undefined,
                currentUser: null, // Ensure currentUser is cleared on logout
            };
        },
        resetUser: (state) => {
            state.user = null;
        },
        resetToken: (state, action) => {
            console.log("resetTokenAction", action);
            localStorage.setItem("token", action.payload.data.token);
            state.token = action.payload.data.token;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                // Store token in localStorage when logging in
                const token = action.payload.result.token;
                localStorage.setItem("token", token);

                state.token = token;
                state.isAuthenticated = true;
            })
            .addMatcher(userApi.endpoints.currentUser.matchFulfilled, (state, action) => {
                if (action.payload.result.user) {
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

export const { logout, resetUser, resetToken } = slice.actions;
export default slice.reducer;

// Selectors
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUser = (state: RootState) => state.user.user;
