import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskActions from "../components/tasks/TaskAction";


const TasksPage = () => {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
            <TaskForm />
            <TaskActions />
            <TaskList />
        </div>
    );
};

export default TasksPage;
