"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "@/components/ui/Button";
import { Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl?: string;
    image?: string; // in case backend sends image
}

export default function AdminPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "Coffee",
        price: "",
        description: "",
        image: null as File | null,
    });
    const [loading, setLoading] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);

    // Auth protection
    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else if (user.role !== "admin") {
            alert("Acces interzis. Doar adminii pot accesa această pagină.");
            router.push("/");
        } else {
            setAuthChecking(false);
        }
    }, [user, router]);

    // Fetch products - all hooks must be called before any conditional returns
    useEffect(() => {
        if (user && user.role === "admin") {
            getProducts();
        }
    }, [user]);

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Don't render until auth is checked
    if (authChecking || !user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-secondary">Se verifică accesul...</p>
                </div>
            </div>
        );
    }

    // Type-safe change handler
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        if (e.target.name === "image" && "files" in e.target) {
            const files = (e.target as HTMLInputElement).files;
            if (files && files[0]) {
                setFormData({ ...formData, image: files[0] });
            }
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("description", formData.description);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            // Logic for token would go here, assuming localStorage 'token' logic from legacy
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/products", data, {
                headers: {
                    token: `Bearer ${token}`, // Adapted from legacy code
                    "Content-Type": "multipart/form-data",
                },
            });
            setFormData({
                name: "",
                category: "Coffee",
                price: "",
                description: "",
                image: null,
            });
            getProducts();
        } catch (err: any) {
            console.error(err);
            const errorMessage =
                err.response?.data?.message ||
                err.response?.data ||
                "Something went wrong";
            alert(`Error: ${JSON.stringify(errorMessage)}`);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { token: `Bearer ${token}` },
            });
            getProducts();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 pt-32">
            <h1 className="text-4xl font-bold font-heading mb-8 text-primary">
                Admin Panel
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-1">
                    <div className="bg-paper p-6 rounded-2xl shadow-lg sticky top-24">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Plus className="text-brand-green" /> Adaugă Produs
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-secondary mb-1">
                                    Nume
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-gold focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-1">
                                    Categorie
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-gold focus:outline-none"
                                >
                                    <option value="Coffee">Cafea</option>
                                    <option value="Non-Coffee">Fără Cafea</option>
                                    <option value="Cold">Rece</option>
                                    <option value="Food">Mâncare</option>
                                    <option value="Pastry">Patiserie</option>
                                    <option value="Other">Altele</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-1">
                                    Preț (RON)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-gold focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-1">
                                    Imagine
                                </label>
                                <div className="border border-stone-200 rounded-xl p-2 bg-stone-50">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-soft file:text-primary hover:file:bg-brand-gold/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-secondary mb-1">
                                    Descriere
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:border-brand-gold focus:outline-none"
                                    rows={3}
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                className="w-full justify-center"
                                disabled={loading}
                            >
                                {loading ? "Se salvează..." : "Salvează Produsul"}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2">
                    <div className="bg-paper rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-stone-100">
                            <h2 className="text-xl font-bold">Listă Produse ({products.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-brand-soft/30 text-secondary text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="p-4">Produs</th>
                                        <th className="p-4">Categorie</th>
                                        <th className="p-4">Preț</th>
                                        <th className="p-4 text-right">Acțiuni</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-100">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-stone-50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {product.imageUrl ? (
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-stone-200 flex items-center justify-center">
                                                            <ImageIcon size={20} className="text-stone-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-primary">{product.name}</p>
                                                        <p className="text-xs text-stone-500 truncate max-w-[200px]">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-secondary">
                                                <span className="px-2 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-semibold">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-4 font-mono font-bold text-primary">
                                                {product.price} <span className="text-xs font-sans font-normal text-stone-500">RON</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Șterge"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-stone-400">
                                                Nu există produse. Adaugă unul!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
