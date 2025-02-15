import {configureStore} from "@reduxjs/toolkit"
import {api} from "./api";
import userSlice from "./features/user/userSlice";
import {notificationMiddleware} from "./middleware/notificationMiddleware";
import {loginMiddleware} from "./features/auth/authMiddleware";
import taskSlice from "./features/task/taskSlice";
import {taskApi} from "./features/task/taskApi";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        // auth: authSlice,
        user: userSlice,
        tasks: taskSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(notificationMiddleware)
            .concat(loginMiddleware.middleware)
            .concat(taskApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;