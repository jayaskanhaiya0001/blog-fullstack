import Blog from "@/models/Blog";
import dbConnect from  '../../../lib/db';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const blog = await Blog.findByIdAndDelete(id);

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}