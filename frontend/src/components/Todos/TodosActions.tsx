import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
import Button from '../ui/CustomButton';

interface TodosActionsProps {
    resetTodo: () => void;
    deleteCompletedTodosHandler: () => void;
    completedTodosExist: boolean;
}

const TodosActions: React.FC<TodosActionsProps> = ({
                                                       resetTodo,
                                                       deleteCompletedTodosHandler,
                                                       completedTodosExist,
                                                   }) => {
    return (
        <div>
            <Button title="Reset Button" onClick={resetTodo}>
                <RiRefreshLine />
            </Button>
            <Button
                title="Clear Completed Todos"
                onClick={deleteCompletedTodosHandler}
                isDisabled={!completedTodosExist}
            >
                <RiDeleteBin2Line />
            </Button>
        </div>
    );
};

export default TodosActions;
