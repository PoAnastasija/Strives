import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useState, useEffect } from "react";

function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');
  
  useEffect(() => {
    if (!localStorage) {
      return;
    }
    const localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return;
    }
    try {
        const parsedTodos = JSON.parse(localTodos).todos;
        setTodos(parsedTodos); 
    } catch (error) {
        console.error(error)
    }
  }, []);
  // garder le storage des infos en local
  function persistData(newList: string[]): void {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }
  function handleAddTodos(newTodo: string): void {
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

export default Home;