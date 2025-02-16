import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { taskApi } from "./taskApi";
import type { Task } from "../../../types/Task";

interface InitialState {
    tasks: Task[];
    isLoading: boolean;
}

const initialState: InitialState = {
    tasks: [],
    isLoading: false,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        resetTasks: (state) => {
            state.tasks = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(taskApi.endpoints.getTasks.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(taskApi.endpoints.getTasks.matchFulfilled, (state, action) => {
                if (Array.isArray(action.payload.result)) {
                    state.tasks = action.payload.result; // Ensure it's an array
                } else {
                    state.tasks = [];
                }
                state.isLoading = false;
            })
            .addMatcher(taskApi.endpoints.createTask.matchFulfilled, (state, action) => {
                if (action.payload.result) {
                    state.tasks = [...state.tasks, action.payload.result];
                }
            })
            .addMatcher(taskApi.endpoints.markTaskDone.matchFulfilled, (state, action) => {
                state.tasks = state.tasks.map((task) =>
                    task.id === action.meta.arg.originalArgs ? { ...task, status: "true" } : task
                );
            })
            .addMatcher(taskApi.endpoints.deleteTask.matchFulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg.originalArgs);
            });
    },
});

export const { resetTasks } = taskSlice.actions;
export default taskSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks?.tasks || [];
export const selectIsLoading = (state: RootState) => state.tasks?.isLoading || false;
