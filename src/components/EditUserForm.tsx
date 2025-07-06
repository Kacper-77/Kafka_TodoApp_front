import { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import type { User } from "../types/types";

type Props = {
    user: User;
    onCancel: () => void;
    onSave: (updated: User) => void;
}

const EditUserForm = ({ user, onCancel, onSave }: Props) => {
    const [username, setUsername] = useState<string>(user.username || "");
    const [email, setEmail] = useState<string>(user.email || "");
    const [password, setPassword] = useState<string>("");
    const [repeatedPassword, setRepeatedPassword] = useState<string>("");
    const [age, setAge] = useState<number | undefined>(user.age);
    const [error, setError] = useState<string | null>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
    
        if (password && repeatedPassword !== password) {
            setError("Repeated password must match the password.");
            return;
        }
    
        try {
            const updatedFields: Partial<User> = {};
    
            if (username.trim()) updatedFields.username = username;
            if (email.trim()) updatedFields.email = email;
            if (password.trim()) updatedFields.password = password;
            if (age !== undefined) updatedFields.age = age;
    
            if (Object.keys(updatedFields).length === 0) return;
    
            const response = await fetchWithAuth("/users/update-user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedFields)
            });
    
            if (response.ok) {
                const updated = await response.json();
                onSave(updated);
            } else {
                setError("Something went wrong.");
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "You don't have permissions to do this.";
            setError(errorMessage);
        }
    };

    const isModified = 
            username !== user.username ||
            email !== user.email ||
            password !== "" ||
            age !== user.age;

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            /> <br />
            <input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            /> <br />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            /> <br />
            <input 
                type="password"
                placeholder="RepeatedPassword"
                value={repeatedPassword}
                onChange={(e) => setRepeatedPassword(e.target.value)} 
            />
            <input 
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber)} 
            /> <br />
            <button type="submit" disabled={!isModified}>Save 💾</button>
            <button type="button" onClick={onCancel}>Cancel ❌</button> <br />
            {error && <p style={{color: "red"}}>{error}</p>}
        </form>
    )  
};

export default EditUserForm;
