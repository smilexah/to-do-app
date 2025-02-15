import type {Middleware, MiddlewareAPI} from "redux";
import {isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {toast} from "sonner";
import {messageCatch} from "../../utils/messageCatch";
import {errorCatch} from "../../utils/errorCatch";


export const notificationMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isFulfilled(action)) {
            const message = messageCatch(action.payload)
            if (message !== "") {
                toast.success(message);
            }
        }

        if (isRejectedWithValue(action)) {
            const error = errorCatch(action.payload)
            if (error !== "") {
                toast.error(error);
            }
        }
        return next(action);
    }