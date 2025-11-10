import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // call service
    const user = await authService.registerUser({firstName, lastName, email, password, phone});

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message || "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) 
      return res.status(400).json({ message: 'email and password required' });

    const { token, user } = await authService.authenticateUser({ email, password });
    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
