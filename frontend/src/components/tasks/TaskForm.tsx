import { useState } from "react";
import { useCreateTaskMutation } from "../../app/features/task/taskApi";

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState("");
    const [createTask] = useCreateTaskMutation();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() !== "") {
            await createTask({ title, status, priority, dueDate });
            setTitle("");
            setPriority(1);
            setDueDate("");
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex flex-col gap-3 p-4 bg-white shadow-md rounded-lg">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded p-2"
                placeholder="Enter task title"
                required
            />
            <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}
                    className="border rounded p-2">
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border rounded p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
