import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const SALT_ROUNDS = 10;

export async function registerUser({ firstName, lastName, email, password, phone }) {
    
    // check if user exists
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error("Email already registered");

    // hash password
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    // create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashed,
        phone,
    });

    // remove password before sending to caller
    const { password: _, ...userSafe } = user.toJSON();
    return userSafe;
}

export async function authenticateUser({ email, password }) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  // Create JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const { password: _p, ...userSafe } = user.toJSON();
  return { token, user: userSafe };
}