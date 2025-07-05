import React, { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import type { Todo, Priority } from "../types/types";
import type { AddTodoFormProps } from "../types/types";

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [priority, setPriority] = useState<Priority>("LOW");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const response = await fetchWithAuth(`/todos/add-todo?priority=${priority}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            });

            if (!response.ok) {
                throw new Error("Something went wrong.")
            }

            if (response.ok) {
                const newTodo: Todo = await response.json();
                onAdd(newTodo);
                setTitle("")
                setDescription("")
                setPriority("LOW")
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Access denied";
            setError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                required
                type="text" 
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>
            <button type="submit">Save 📝</button> 
            <br />
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    );
};

export default AddTodoForm;
