import {useGetTasksQuery} from "../../app/features/task/taskApi";


const TaskActions = () => {
    const { refetch } = useGetTasksQuery();

    return (
        <div className="flex gap-2 mt-4">
            <button onClick={() => refetch()} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                Refresh Tasks
            </button>
        </div>
    );
};

export default TaskActions;
