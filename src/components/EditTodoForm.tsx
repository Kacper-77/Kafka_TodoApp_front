import React, { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import type { Todo, Priority } from "../types/types";

type Props = {
    todo: Todo;
    onCancel: () => void;
    onSave: (updated: Todo) => void; 
}

const EditTodoForm = ({ todo, onCancel, onSave}: Props) => {
    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description);
    const [priority, setPriority] = useState<Priority>(todo.priority);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("")

        try {
            const response = await fetchWithAuth(`/todos/update-todo/${todo.id}?priority=${priority}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            if (response.ok) {
                const updated = await response.json();
                onSave(updated);
            } else {
                setError("Something went wrong.");
                return;
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "You don't have permissions to do this";
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
            /> <br />
            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
            /> <br />
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
            <button type="submit" disabled={!title.trim()}>Save 💾</button>
            <button type="button" onClick={onCancel}>Cancel ❌</button> <br />
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    )
};

export default EditTodoForm;