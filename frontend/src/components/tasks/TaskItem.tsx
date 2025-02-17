import { useDeleteTaskMutation, useGetTasksQuery, useMarkTaskDoneMutation } from "../../app/features/task/taskApi";
import { Task } from "../../types/Task";

const TaskItem = ({ task }: { task: Task }) => {
    const [markTaskDone] = useMarkTaskDoneMutation();
    const [deleteTask] = useDeleteTaskMutation();
    const { refetch } = useGetTasksQuery();

    const handleMarkTaskDone = async () => {
        try {
            await markTaskDone(task.id).unwrap();
            refetch();
        } catch (error) {
            console.error("Failed to mark task as done:", error);
        }
    };

    const handleDeleteTask = async () => {
        try {
            await deleteTask(task.id).unwrap();
            refetch();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    return (
        <li className="flex justify-between items-center p-3 border rounded bg-white shadow-md">
            <span
                className={`cursor-pointer ${task.status ? "line-through text-gray-500" : ""}`}
                onClick={handleMarkTaskDone}
            >
                {task.title} - <span className="text-sm text-gray-600">Priority: {task.priority}</span>
            </span>
            <button
                onClick={handleDeleteTask}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </li>
    );
};

export default TaskItem;