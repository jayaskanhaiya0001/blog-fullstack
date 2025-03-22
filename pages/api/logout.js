import dbConnect from '../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error, "Error during logout");
    res.status(500).json({ message: 'Internal server error' });
  }
}