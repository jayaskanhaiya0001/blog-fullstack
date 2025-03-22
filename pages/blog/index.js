import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import WithAuth from '@/components/Protected';

function BlogList(
  { posts }
) {
  const [blogPosts, setBlogPosts] = useState(posts?.data || []);
  const { user } = useAuth();
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/blog/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBlogPosts(posts?.data.filter(blog => blog._id !== id));
      } else {
        alert('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred');
    }
  };

  return (

    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">Latest Articles</h1>
 
          <Link href={'/blog/manage/new'}>
            <button className="  hidden md:block text-[#7F265B] bg-[#fff] px-4 py-2 rounded-lg font-bold  hover:text-black">Create New Blog</button>
          </Link> 
    
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts?.map(blog => (
          <article key={blog._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
            {blog.featuredImage && (
              <div className="relative h-48">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <button
              onClick={() => handleDelete(blog._id)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100 transition">
              <FaTrash className="text-red-600" />
            </button>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-black px-3 py-1 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/blog/${blog._id}`} className="text-black hover:text-blue-600">
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{blog.formattedDate}</span>
                <span>{blog.views} views</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>

  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/api/blog/getAllBlog`);
  const posts = await res.json();
  return {
    props: { posts },
    revalidate: 60
  };
}

export default WithAuth(BlogList)