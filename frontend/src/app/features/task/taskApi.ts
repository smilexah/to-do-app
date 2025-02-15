import type { Task } from "../../../types/Task";
import { api } from "../../api";
import type { Response } from "../../../types/response/response";
import type { CreateTaskRequest } from "../../../types/request/createTaskRequest";

export const taskApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<Response<Task[]>, void>({
            query: () => ({
                url: "tasks/all",
                method: "GET",
            }),
        }),
        createTask: build.mutation<Response<Task>, CreateTaskRequest>({
            query: (body) => ({
                url: "tasks/create",
                method: "POST",
                body: body,
            }),
        }),
        markTaskDone: build.mutation<Response<any>, number>({
            query: (id) => ({
                url: `tasks/done/${id}`,
                method: "PUT",
            }),
        }),
        deleteTask: build.mutation<Response<any>, number>({
            query: (id) => ({
                url: `tasks/delete/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useMarkTaskDoneMutation,
    useDeleteTaskMutation,
} = taskApi;
