import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import sequelize from './config/db.js';
import './models/user.model.js';
import "./models/index.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
  }
})();
