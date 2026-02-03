import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:5000/api/orders/find/${user.id}`, {
                    headers: { token: `Bearer ${token}` }
                });
                setOrders(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (user) {
            getOrders();
        }
    }, [user]);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold mb-4 text-amber-900">Bine ai venit, {user.name}</h1>
                <p className="text-stone-600">Email: {user.email}</p>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-amber-900">Istoric Comenzi</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-100">
                        <tr>
                            <th className="p-4 border-b">ID Comandă</th>
                            <th className="p-4 border-b">Dată</th>
                            <th className="p-4 border-b">Total</th>
                            <th className="p-4 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-stone-50">
                                <td className="p-4 border-b text-sm text-stone-500">{order._id}</td>
                                <td className="p-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 border-b font-bold">{order.totalAmount} RON</td>
                                <td className="p-4 border-b">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {order.status === 'Pending' ? 'În Așteptare' : order.status === 'Completed' ? 'Completat' : order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <p className="p-8 text-center text-stone-500">Nu au fost găsite comenzi.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
