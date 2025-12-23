import bcrypt from 'bcrypt';

const password = 'admin123'; // password you want to hash
const SALT_ROUNDS = 10;

const hash = await bcrypt.hash(password, SALT_ROUNDS);
console.log('Hashed password:', hash);

