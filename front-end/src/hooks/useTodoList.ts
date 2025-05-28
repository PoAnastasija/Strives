import { useState } from 'react';

export const useTodoList = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTodo = () => {
    if (newTask.trim()) {
      setTodos([...todos, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updated = [...todos];
    updated.splice(index, 1);
    setTodos(updated);
  };

  return {
    todos,
    newTask,
    setNewTask,
    handleAddTodo,
    handleDeleteTodo
  };
};
