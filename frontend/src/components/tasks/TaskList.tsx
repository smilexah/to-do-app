import {useGetTasksQuery} from "../../app/features/task/taskApi";
import TaskItem from "./TaskItem";


const TaskList = () => {
    const { data, isLoading } = useGetTasksQuery();

    if (isLoading) return <p className="text-center">Loading tasks...</p>;
    if (!data?.result?.length) return <p className="text-center">No tasks available.</p>;

    return (
        <ul className="mt-4 space-y-2">
            {data.result.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;
