import React from "react";

interface TodoCardProps {
    children: React.ReactNode;
    handleDeleteTodo: (index: number) =>void;
    handleEditTodo: (index: number) =>void;
    index: number;
}

export default function TodoCard({children, handleDeleteTodo, index, handleEditTodo}: TodoCardProps) {
    return (
        <li className='todoItem'>
            {children}
            <div className='actionsContainer'>
                <button onClick={() => handleEditTodo(index)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => handleDeleteTodo(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </li>
    );
}
