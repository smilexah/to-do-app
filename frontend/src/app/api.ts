import {fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../contants";
import {createApi} from "@reduxjs/toolkit/query/react";
import type {RootState} from "./store";
import {logout, resetToken} from "./features/user/userSlice";
import type {LoginResponse} from "../types/response/authResponse";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})



const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQueryWithRetry(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        try {
            const refreshResult = await baseQuery(
                {
                    url: "/auth/refresh",
                    method: "POST",
                },
                api,
                extraOptions
            );

            const refreshData = refreshResult.data as LoginResponse;

            if (refreshData && refreshData.token) {
                api.dispatch(resetToken(refreshResult));

                result = await baseQueryWithRetry(args, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            api.dispatch(logout());
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
})