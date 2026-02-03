"use client";

import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState(""); // Legacy used username, but email is standard. I'll use text input generic.
    const [password, setPassword] = useState("");
    const { dispatch, isFetching } = useContext(AuthContext);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email, // Backend expects email, not username
                password,
            });
            // Backend sends { token, user: { id, name, email, role, preferences } }
            const userData = {
                _id: res.data.user.id,
                username: res.data.user.name,
                email: res.data.user.email,
                role: res.data.user.role,
            };
            dispatch({ type: "LOGIN_SUCCESS", payload: userData });
            localStorage.setItem("token", res.data.token);
            router.push("/admin"); // Redirect to admin after login
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            alert("Login failed. Check your credentials.");
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen pt-32 flex items-center justify-center p-4">
            <div className="bg-paper p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-heading font-bold text-center mb-8 text-primary">Bine ai venit</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-secondary mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-gold focus:outline-none bg-stone-50"
                            placeholder="exemplu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-secondary mb-2">Parola</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-gold focus:outline-none bg-stone-50"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full justify-center" disabled={isFetching}>
                        {isFetching ? "Se conectează..." : "Intră în cont"}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-secondary">
                    Nu ai cont? <Link href="/register" className="text-brand-gold font-bold">Înregistrează-te</Link>
                </p>
            </div>
        </div>
    );
}
