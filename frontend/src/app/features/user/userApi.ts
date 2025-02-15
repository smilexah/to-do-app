import {api} from "../../api";
import type {CurrentUserResponse} from "../../../types/response/userResponse";
import type {Response} from "../../../types/response/response";

export const userApi = api.injectEndpoints({
    endpoints: build => ({
        currentUser: build.query<Response<CurrentUserResponse>,void>({
            query: body => ({
                url: "user/current",
                method: "GET",
            })
        })
    })
})

export const {
    useLazyCurrentUserQuery,
    useCurrentUserQuery
} = userApi