import {useDeleteTaskMutation, useMarkTaskDoneMutation} from "../../app/features/task/taskApi";
import {Task} from "../../types/Task";

const TaskItem = ({ task }: { task: Task }) => {
    const [markTaskDone] = useMarkTaskDoneMutation();
    const [deleteTask] = useDeleteTaskMutation();

    return (
        <li className="flex justify-between items-center p-3 border rounded bg-white shadow-md">
            <span
                className={`cursor-pointer ${task.status ? "line-through text-gray-500" : ""}`}
                onClick={() => markTaskDone(task.id)}
            >
                {task.title} - <span className="text-sm text-gray-600">Priority: {task.priority}</span>
            </span>
            <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </li>
    );
};

export default TaskItem;