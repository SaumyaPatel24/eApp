import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import reviewRoutes from "./routes/review.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import orderRoutes from "./routes/order.routes.js";
import userRoutes from './routes/user.js';
import chatbotRoutes from "./routes/chatbot.js";
const app = express();

app.use(cors());

app.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  console.log("REQ METHOD:", req.method, "REQ URL:", req.url);
  console.log("REQ BODY:", req.body);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/user', userRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.get('/', (req, res) => res.send('E-commerce backend running'));

export default app;