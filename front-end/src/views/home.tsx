// import TodoInput from "../components/todo/TodoInput";
// import TodoList from "../components/todo/TodoList";
// import { useState, useEffect } from "react";

// function Home() {
//   const [todos, setTodos] = useState<string[]>([]);
//   const [todoValue, setTodoValue] = useState<string>('');
  
//   useEffect(() => {
//     if (!localStorage) {
//       return;
//     }
//     const localTodos = localStorage.getItem('todos');
//     if (!localTodos) {
//       return;
//     }
//     try {
//         const parsedTodos = JSON.parse(localTodos).todos;
//         setTodos(parsedTodos); 
//     } catch (error) {
//         console.error(error)
//     }
//   }, []);
//   // garder le storage des infos en local
//   function persistData(newList: string[]): void {
//     localStorage.setItem('todos', JSON.stringify({ todos: newList }));
//   }
//   function handleAddTodos(newTodo: string): void {
//     const newTodoList = [...todos, newTodo];
//     persistData(newTodoList);
//     setTodos(newTodoList);
//   }
//   function handleDeleteTodo(index: number): void {
//     const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
//     persistData(newTodoList);
//     setTodos(newTodoList);
//   }
//   function handleEditTodo(index: number): void {
//     const valueToBeEdited = todos[index];
//     setTodoValue(valueToBeEdited);
//     handleDeleteTodo(index);
//   }

//   return (
//     <>
//       <TodoInput
//         todoValue={todoValue}
//         setTodoValue={setTodoValue}
//         handleAddTodos={handleAddTodos}
//       />
//       <TodoList
//         handleEditTodo={handleEditTodo}
//         handleDeleteTodo={handleDeleteTodo}
//         todos={todos}
//       />
//     </>
//   );
// }
// export default Home;


import TodoInput from "../components/todo/TodoInput";
import TodoList from "../components/todo/TodoList";
import { useState, useEffect } from "react";

function Home() {
  const [todos1, setTodos1] = useState<string[]>([]);
  const [todos2, setTodos2] = useState<string[]>([]);
  const [todoValue, setTodoValue] = useState<string>('');
  const [currentList, setCurrentList] = useState<number>(1);

  useEffect(() => {
    if (!localStorage) return;

    const localTodos1 = localStorage.getItem('todos1');
    const localTodos2 = localStorage.getItem('todos2');

    if (localTodos1) {
      try {
        const parsedTodos = JSON.parse(localTodos1).todos;
        setTodos1(parsedTodos);
      } catch (error) {
        console.error(error);
      }
    }

    if (localTodos2) {
      try {
        const parsedTodos = JSON.parse(localTodos2).todos;
        setTodos2(parsedTodos);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  function persistData(newList: string[], listNumber: number): void {
    localStorage.setItem(`todos${listNumber}`, JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo: string): void {
    const newTodoList = currentList === 1 ? [...todos1, newTodo] : [...todos2, newTodo];
    if (currentList === 1) {
      setTodos1(newTodoList);
      persistData(newTodoList, 1);
    } else {
      setTodos2(newTodoList);
      persistData(newTodoList, 2);
    }
    setTodoValue('');
  }

  function handleDeleteTodo(index: number, listNumber: number): void {
    const newTodoList = listNumber === 1 ? todos1.filter((_, todoIndex) => todoIndex !== index) : todos2.filter((_, todoIndex) => todoIndex !== index);
    if (listNumber === 1) {
      setTodos1(newTodoList);
      persistData(newTodoList, 1);
    } else {
      setTodos2(newTodoList);
      persistData(newTodoList, 2);
    }
  }

  function handleEditTodo(index: number, listNumber: number): void {
    const valueToBeEdited = listNumber === 1 ? todos1[index] : todos2[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index, listNumber);
    setCurrentList(listNumber);
  }

  return (
    <>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div>
          {/* <h3>To-Do List 1</h3> */}
          <TodoList
            handleEditTodo={(index) => handleEditTodo(index, 1)}
            handleDeleteTodo={(index) => handleDeleteTodo(index, 1)}
            todos={todos1}
          />
        </div>
        <div>
          {/* <h3>To-Do List 2</h3> */}
          <TodoList
            handleEditTodo={(index) => handleEditTodo(index, 2)}
            handleDeleteTodo={(index) => handleDeleteTodo(index, 2)}
            todos={todos2}
          />
        </div>
      </div>
    </>
  );
}
export default Home;