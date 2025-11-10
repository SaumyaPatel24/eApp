import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import reviewRoutes from "./routes/review.routes.js";
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON bodies

app.use('/api/auth', authRoutes); // prefix auth routes
app.use('/api/products',productRoutes);
app.use("/api/reviews", reviewRoutes);
app.get('/', (req, res) => res.send('E-commerce backend running'));

export default app;



