import { useEffect } from 'react';
import Image from 'next/image';
// import { useAuth } from '../../../contexts/auth-context';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/components/Protected';

function BlogPost({ blog }) {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-4 py-8  bg-white w-full h-screen">
      <article className="prose lg:prose-xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-black">{blog?.data.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className='text-black'>{blog?.data.formattedDate}</span>
            <span>•</span>
            <span>{blog?.data.views} views</span>
            {/* {user?.id === blog?.data.id && ( */}
            <Link
              href={`/blog/manage/${blog.data.id}`}
              className="text-blue-600 hover:underline"
            >
              Edit Post
            </Link>
            {/* )} */}
          </div>
          {blog?.data.featuredImage && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
              <Image
                src={blog?.data.featuredImage}
                alt={blog?.data.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </header>
        <p className='text-black'>{blog.data.content}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: blog.data.content }} /> */}
        <div className="mt-8 flex flex-wrap gap-2 text-black">
          {blog?.data.tags?.map(tag => (
            <span key={tag} className="bg-gray-100 px-3 py-1 text-sm rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/blog/getAllBlog`);
  const blogs = await res.json();

  const paths = blogs?.data?.map(blog => ({
    params: { slug: blog._id }
  }));

  console.log(paths, 'Check Patg value')

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/blog/${params.slug}`);
  console.log(res, "Check Response Value")
  const blog = await res.json();

  console.log(blog, "Check")
  if (!blog) return { notFound: true };
  return {
    props: { blog },
    revalidate: 60
  };
}

export default withAuth(BlogPost)