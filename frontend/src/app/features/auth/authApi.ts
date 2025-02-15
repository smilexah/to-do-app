import {LoginResponse} from "../../../types/response/authResponse";
import type {
    LoginRequest,
    RegisterRequest,
} from "../../../types/request/authRequest";
import {api} from "../../api";
import type {Response} from "../../../types/response/response";


export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<Response<LoginResponse>, LoginRequest>({
            query: body => ({
                url: "auth/login",
                method: "POST",
                body: body
            })
        }),
        register: build.mutation<Response<any>, RegisterRequest>({
            query: body => ({
                url: "auth/register",
                method: "POST",
                body: body
            })
        }),
        refreshToken: build.mutation<Response<LoginResponse>, void>({
            query: () => ({
                url: "auth/refresh-token",
                method: "POST",
            })
        }),
        logout: build.mutation<Response<any>, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            })
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useLogoutMutation} = authApi