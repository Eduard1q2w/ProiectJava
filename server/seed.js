const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connection Successfull!'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

const products = [
    // Espresso Classics
    {
        name: "Espresso",
        category: "Coffee",
        price: 10,
        description: "Un shot intens de cafea pură.",
        imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop",
        available: true
    },
    {
        name: "Doppio (Espresso Dublu)",
        category: "Coffee",
        price: 14,
        description: "Shot dublu de espresso pentru energie extra.",
        imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop",
        available: true
    },
    {
        name: "Ristretto",
        category: "Coffee",
        price: 10,
        description: "Un shot scurt, mai concentrat și mai dulce decât espresso.",
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=3387&auto=format&fit=crop",
        available: true
    },
    {
        name: "Americano",
        category: "Coffee",
        price: 14,
        description: "Espresso diluat cu apă fierbinte pentru o aromă fină.",
        imageUrl: "https://images.unsplash.com/photo-1551030173-122fca938348?q=80&w=3467&auto=format&fit=crop",
        available: true
    },
    {
        name: "Long Black",
        category: "Coffee",
        price: 14,
        description: "Apă fierbinte peste care se toarnă un dublu espresso.",
        imageUrl: "https://images.unsplash.com/photo-1594910629738-4e8992ca36a1?q=80&w=3389&auto=format&fit=crop",
        available: true
    },

    // Milk Based
    {
        name: "Macchiato",
        category: "Coffee",
        price: 12,
        description: "Espresso 'pătat' cu puțină spumă de lapte.",
        imageUrl: "https://images.unsplash.com/photo-1485808191679-5f8c7c8606af?q=80&w=3469&auto=format&fit=crop",
        available: true
    },
    {
        name: "Cortado",
        category: "Coffee",
        price: 13,
        description: "Cantități egale de espresso și lapte cald.",
        imageUrl: "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=3387&auto=format&fit=crop",
        available: true
    },
    {
        name: "Cappuccino",
        category: "Coffee",
        price: 16,
        description: "Echilibru perfect între espresso, lapte și spumă.",
        imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=3535&auto=format&fit=crop",
        available: true
    },
    {
        name: "Flat White",
        category: "Coffee",
        price: 17,
        description: "Dublu espresso cu strat fin de cremă de lapte (microfoam).",
        imageUrl: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=3474&auto=format&fit=crop",
        available: true
    },
    {
        name: "Latte",
        category: "Coffee",
        price: 17,
        description: "Espresso cu mult lapte cremos spumat.",
        imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=3538&auto=format&fit=crop",
        available: true
    },
    {
        name: "Mocha",
        category: "Coffee",
        price: 19,
        description: "Un latte delicios combinat cu sirop de ciocolată.",
        imageUrl: "https://images.unsplash.com/photo-1563805917865-2983dd8c9fae?q=80&w=3343&auto=format&fit=crop",
        available: true
    },
    {
        name: "Espresso Con Panna",
        category: "Coffee",
        price: 13,
        description: "Espresso acoperit cu un strat generos de frișcă.",
        imageUrl: "https://images.unsplash.com/photo-1462917882517-e26647961129?q=80&w=3387&auto=format&fit=crop",
        available: true
    },

    // Others
    {
        name: "Croissant cu Unt",
        category: "Pastry",
        price: 8,
        description: "Croissant franțuzesc clasic, pufos și untos.",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=3526&auto=format&fit=crop",
        available: true
    },
    {
        name: "Muffin cu Afine",
        category: "Pastry",
        price: 12,
        description: "Muffin proaspăt copt plin de afine.",
        imageUrl: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=3387&auto=format&fit=crop",
        available: true
    },
    {
        name: "Meniu Cafea + Patiserie",
        category: "Offers",
        price: 22,
        description: "Orice cafea + orice produs de patiserie la alegere.",
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=3387&auto=format&fit=crop",
        available: true
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Meniu Mazi Coffee Actualizat cu Succes!");

        const adminExists = await User.findOne({ email: "admin@example.com" });
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("admin123", salt);
            const adminUser = new User({
                name: "Admin Mazi",
                email: "admin@example.com",
                password: hashedPassword,
                role: "admin"
            });
            await adminUser.save();
            console.log("Utilizator Admin Creat! (email: admin@example.com, pass: admin123)");
        } else {
            console.log("Adminul există deja.");
        }

        mongoose.connection.close();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seedDB();
