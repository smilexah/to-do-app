import Todo from './Todo';
import styles from './TodoList.module.css';

interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
}

interface TodoListProps {
    todos: TodoItem[];
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, removeTodo, toggleTodo }) => {
    return (
        <div className={styles.todoListContainer}>
            {!todos.length && <h2>Todo list is empty!</h2>}
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    removeTodo={removeTodo}
                    toggleTodo={toggleTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
