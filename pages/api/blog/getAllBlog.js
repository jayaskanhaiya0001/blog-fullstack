import Blog from "@/models/Blog";
import dbConnect from  '../../../lib/db';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const posts = await Blog.find({}).sort({ createdAt: -1 }); 
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}