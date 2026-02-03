import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter((item) => item.category === category));
        }
    }, [category, products]);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-amber-900">Meniul Nostru</h1>

            <div className="flex justify-center gap-4 mb-8 flex-wrap">
                {[
                    { val: 'All', label: 'Toate' },
                    { val: 'Coffee', label: 'Cafea' },
                    { val: 'Pastry', label: 'Patiserie' },
                    { val: 'Offers', label: 'Oferte' },
                    { val: 'Other', label: 'Altele' }
                ].map((cat) => (
                    <button
                        key={cat.val}
                        onClick={() => setCategory(cat.val)}
                        className={`px-4 py-2 rounded-full font-bold transition ${category === cat.val
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-stone-600 mb-4 text-sm flex-grow">{product.description}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="text-lg font-bold text-amber-900">{product.price} RON</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full text-sm font-bold transition"
                                    disabled={!product.available}
                                >
                                    {product.available ? "Adaugă în Coș" : "Stoc Epuizat"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
