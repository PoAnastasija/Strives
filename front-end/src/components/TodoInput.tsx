interface TodoInputProps {
    handleAddTodos: (todo: string) => void;
    todoValue: string;
    setTodoValue: (value: string) => void;
}

export default function TodoInput({ handleAddTodos, todoValue, setTodoValue }: TodoInputProps) {
    return (
        <header>
            <input
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
                placeholder="Enter todo..."
            />
            <button
                onClick={() => {
                    handleAddTodos(todoValue);
                    setTodoValue('');
                }}
            >
                Add
            </button>
        </header>
    );
}
