import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <div
                className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Bine ați venit la Mazi Coffee</h1>
                    <p className="text-xl md:text-2xl mb-8">Experimentează cea mai bună cafea din oraș.</p>
                    <Link to="/menu" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition text-lg">
                        Comandă Acum
                    </Link>
                </div>
            </div>

            <div className="container mx-auto py-16 px-4 text-center">
                <h2 className="text-3xl font-bold mb-8 text-amber-900">De ce să ne alegi pe noi?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Boabe Premium</h3>
                        <p className="text-stone-600">Folosim doar cele mai fine boabe de cafea din lume.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Barista Experți</h3>
                        <p className="text-stone-600">Personalul nostru este instruit să creeze ceașca perfectă de fiecare dată.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Atmosferă Plăcută</h3>
                        <p className="text-stone-600">Relaxează-te în spațiul nostru cald și primitor.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
