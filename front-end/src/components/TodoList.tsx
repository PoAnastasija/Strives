import TodoCard from './TodoCard';

interface TodoListProps {
    todos: string[]; // Array of todo items (strings)
    handleDeleteTodo: (index: number) => void; // Function to handle deleting a todo
    handleEditTodo: (index: number) => void; // Function to handle editing a todo
}

export default function TodoList({ todos, handleDeleteTodo, handleEditTodo }: TodoListProps) {
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => (
                <TodoCard
                    key={todoIndex}
                    index={todoIndex}
                    handleDeleteTodo={handleDeleteTodo}
                    handleEditTodo={handleEditTodo}
                >
                    <p>{todo}</p>
                </TodoCard>
            ))}
        </ul>
    );
}
  