import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaUser, FaCoffee } from 'react-icons/fa';

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <nav className="bg-amber-900 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                    <FaCoffee /> Mazi Coffee
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-amber-200 transition">Acasă</Link>
                    <Link to="/menu" className="hover:text-amber-200 transition">Meniu</Link>

                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="hover:text-amber-200 transition">Admin</Link>
                            )}
                            <Link to="/profile" className="hover:text-amber-200 transition flex items-center gap-1">
                                <FaUser /> {user.name}
                            </Link>
                            <button onClick={handleLogout} className="bg-amber-700 hover:bg-amber-600 px-3 py-1 rounded transition">
                                Deconectare
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-amber-200 transition">Autentificare</Link>
                    )}

                    <Link to="/cart" className="relative hover:text-amber-200 transition">
                        <FaShoppingCart size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
