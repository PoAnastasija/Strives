import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

type Todo = string;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');

  // garder le storage des infos en local
  function persistData(newList: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }
  function handleAddTodos(newTodo: Todo): void {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }
  function handleDeleteTodo(index: number): void {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
  }
  function handleEditTodo(index: number): void {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }
  useEffect(() => {
    if (!localStorage) {
      return;
    }
    const localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return;
    }
    const parsedTodos = JSON.parse(localTodos).todos;
    setTodos(parsedTodos);
  }, []);

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

export default App;