import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            navigate("/login");
        } catch (err) {
            setError(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-amber-900">Înregistrare</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nume"
                        className="p-3 border border-stone-300 rounded focus:outline-none focus:border-amber-500"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 border border-stone-300 rounded focus:outline-none focus:border-amber-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Parola"
                        className="p-3 border border-stone-300 rounded focus:outline-none focus:border-amber-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-amber-600 text-white p-3 rounded font-bold hover:bg-amber-700 transition"
                    >
                        Înregistrează-te
                    </button>
                    {error && <span className="text-red-500 text-center">Ceva nu a mers bine!</span>}
                </form>
                <p className="mt-4 text-center text-stone-600">
                    Ai deja cont? <Link to="/login" className="text-amber-600 font-bold">Autentifică-te</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
