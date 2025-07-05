import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [email, steEmail] = useState<string>("");
    const [password,  setPassword] = useState<string>("");
    const [age, setAge] = useState<number | undefined>(undefined);
    const [error, steError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleRegistration = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/register-page`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username, 
                        email,
                        password, 
                        age
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Please pass valid data.")
            }

            setSuccess(true)
            steError("")

            navigate("/dashboard")
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Registration error";
            steError(errorMessage);
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>TodoApp</h2>

            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /><br />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => steEmail(e.target.value)}
            /><br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber)}
            /><br />
            <button onClick={handleRegistration}>Sign up</button>
            {success && <p style={{color: "lime"}}>Signed up!</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
};

export default RegisterPage;
