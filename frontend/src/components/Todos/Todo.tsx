import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri';
import { FaCheck } from 'react-icons/fa';
import styles from './Todo.module.css';

interface TodoProps {
    todo: {
        id: number;
        text: string;
        isCompleted: boolean;
    };
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, removeTodo, toggleTodo }) => {
    return (
        <div
            className={`${styles.todo} ${todo.isCompleted ? styles.completedTodo : ''}`}
        >
            <RiTodoFill className={styles.todoIcon} />
            <h3 className={styles.todoText}>{todo.text}</h3>
            <RiDeleteBin2Line
                className={styles.deleteIcon}
                onClick={() => removeTodo(todo.id)}
            />
            <FaCheck
                className={styles.checkIcon}
                onClick={() => toggleTodo(todo.id)}
            />
        </div>
    );
};

export default Todo;
