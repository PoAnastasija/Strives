import TodoCard from './TodoCard';

// interface TodoListProps {
//     todos: string[];
//     handleDeleteTodo: (index: number) => void;
//     handleEditTodo: (index: number) => void;
// }

// export default function TodoList({ todos, handleDeleteTodo, handleEditTodo }: TodoListProps) {
//     return (
//         <ul className='main'>
//             <div>
//             {todos.map((todo, todoIndex) => (
//                 <TodoCard
//                 key={todoIndex}
//                 index={todoIndex}
//                 handleDeleteTodo={handleDeleteTodo}
//                 handleEditTodo={handleEditTodo}>
//                     <p>{todo}</p>
//                 </TodoCard>
//             ))}
//             </div>
//         </ul>
//     );
// }
  
import './todo.css';

interface TodoListProps {
  todos: string[];
  handleDeleteTodo: (index: number) => void;
  handleEditTodo: (index: number) => void;
}

export default function TodoList({ todos, handleDeleteTodo, handleEditTodo }: TodoListProps) {
  return (
    <div style={{ width: '45%', margin: '10px' }}>
      <ul className="main"> {}
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
    </div>
  );
}