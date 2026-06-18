import React, { useEffect, useState } from 'react'

export default function Todo() {

    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedTodos = localStorage.getItem("todo")
        if (savedTodos) {
            setTodo(JSON.parse(savedTodos))
        }
        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("todo", JSON.stringify(todo))
        }
    }, [todo, isInitialized])


    const handleAddTodo = () => {
        if (!input.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: input,
            completed: false,
        };

        setTodo([...todo, newTodo]);
        setInput("");
    };

    const toggleTodo = (id) => {
        setTodo(
            todo.map((todo) => todo.id === id ? {
                ...todo, completed: !todo.completed
            } :
                todo
            )
        )
    }

    const deleteTodo = (id) => {
        setTodo(
            todo.filter((todo) => todo.id !== id)
        )
    }

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    }

    const editTodo = (id) => {
        setTodo(
            todo.map((todo) => todo.id === id ?
                {
                    ...todo,
                    text: editText
                }
                : todo
            )
        );
        setEditingId(null);
        setEditText("")
    }

    return (
        <div>
            <h1>Todo App</h1>

            <input type="text"
                placeholder='Enter Todo'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleAddTodo}>Add Todo</button>

            <ul>
                {todo.map((todo) => (
                    <li key={todo.id}>


                        <input type='checkbox'
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />

                        {editingId === todo.id ? (
                            <>
                                <input value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />

                                <button onClick={() => editTodo(todo.id)}>
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                                    {todo.text}
                                </span>

                                <button onClick={() => startEdit(todo)}>
                                    Edit
                                </button>
                            </>
                        )
                        }

                        <button onClick={() => deleteTodo(todo.id)}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
