import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Coffee',
        price: '',
        description: '',
        image: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("image", formData.image);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/products", data, {
                headers: {
                    token: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData({ name: '', category: 'Coffee', price: '', description: '', image: null });
            getProducts();
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.response?.data || "Something went wrong";
            alert(`Error: ${JSON.stringify(errorMessage)}`);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { token: `Bearer ${token}` }
            });
            getProducts();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-amber-900">Panou Admin</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
                <h2 className="text-xl font-bold mb-4">Adaugă Produs Nou</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nume Produs"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-3 border border-stone-300 rounded"
                        required
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="p-3 border border-stone-300 rounded"
                    >
                        <option value="Coffee">Cafea</option>
                        <option value="Pastry">Patiserie</option>
                        <option value="Offers">Oferte</option>
                        <option value="Other">Altele</option>
                    </select>
                    <input
                        type="number"
                        name="price"
                        placeholder="Preț"
                        value={formData.price}
                        onChange={handleChange}
                        className="p-3 border border-stone-300 rounded"
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="p-3 border border-stone-300 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Descriere"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-3 border border-stone-300 rounded md:col-span-2"
                        rows="3"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition md:col-span-2 disabled:bg-green-400"
                        disabled={loading}
                    >
                        {loading ? "Se adaugă..." : "Adaugă Produs"}
                    </button>
                </form>
            </div>

            <h2 className="text-xl font-bold mb-4">Listă Produse</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-100">
                        <tr>
                            <th className="p-4 border-b">Imagine</th>
                            <th className="p-4 border-b">Nume</th>
                            <th className="p-4 border-b">Categorie</th>
                            <th className="p-4 border-b">Preț</th>
                            <th className="p-4 border-b">Acțiune</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-stone-50">
                                <td className="p-4 border-b">
                                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="p-4 border-b font-bold">{product.name}</td>
                                <td className="p-4 border-b">{product.category}</td>
                                <td className="p-4 border-b">{product.price} RON</td>
                                <td className="p-4 border-b">
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                                    >
                                        Șterge
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
