import { useState } from 'react';
import styles from './TodoForm.module.css';
import Button from '../ui/CustomButton';

interface TodoFormProps {
    addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [text, setText] = useState<string>('');

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (!text.trim()) {
            alert('Todo cannot be empty. Please enter valid text.');
            return;
        }
        addTodo(text);
        setText('');
    };

    return (
        <div className={styles.todoFormContainer}>
            <form onSubmit={onSubmitHandler}>
                <input
                    type="text"
                    placeholder="Enter new todo"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button type="submit" title="Submit">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default TodoForm;