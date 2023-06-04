import express from 'express';
// В ноде нужно установить пакет 'cors' -> npm install cors
import cors from 'cors'; // Импортируйте пакет cors
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';

const PORT = process.env.PORT ?? 3000;


const app = express();

app.set('view engine', 'ejs');

app.use(cors()); // Добавьте использование cors middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(productRoutes);
app.use(cartRoutes);

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
});