import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch, isFetching, error } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token); // Store token separately if needed for headers
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-amber-900">Autentificare</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                        className="bg-amber-600 text-white p-3 rounded font-bold hover:bg-amber-700 transition disabled:bg-amber-400"
                        disabled={isFetching}
                    >
                        {isFetching ? "Se încarcă..." : "Autentificare"}
                    </button>
                    {error && <span className="text-red-500 text-center">Ceva nu a mers bine!</span>}
                </form>
                <p className="mt-4 text-center text-stone-600">
                    Nu ai cont? <Link to="/register" className="text-amber-600 font-bold">Înregistrează-te</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
