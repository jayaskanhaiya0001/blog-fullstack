import Blog from "@/models/Blog";
import dbConnect from  '../../../lib/db';

export default async function handler(req, res) {
  await dbConnect();

  console.log(req.body , "Check Body")

  // const {title , con} = req.body;

  if (req.method === 'POST') {
    try {
      const blog = new Blog(req.body);
      await blog.save();
      res.status(201).json({ success: true, data: blog });
    } catch (error) {
      console.log(error , 'Error hain ??')
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}