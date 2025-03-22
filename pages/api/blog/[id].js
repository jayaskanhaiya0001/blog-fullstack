import Blog from "@/models/Blog";
import dbConnect from  '../../../lib/db';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Find by ID or slug
      const post = await Blog.findOne({
        $or: [{ _id: id }, { slug: id }],
      });

      if (!post) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      res.status(200).json({ success: true, data: post });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}