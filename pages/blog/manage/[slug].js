import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import WithAuth from '@/components/Protected';

function BlogEditor() {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug, 'Check Slug Hain ??')
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    featuredImage: '',
    // status: 'draft'
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello, TipTap!</p>",
  });

  useEffect(() => {
    if (slug !== 'new') {
      fetch(`/api/blog/${slug}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            title: data?.data?.title,
            content: data?.data?.content,
            excerpt: data?.data?.excerpt,
            tags: data?.data?.tags,
            featuredImage: data?.data?.featuredImage,
          }
          );
        });
    }
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = slug === 'new' ? 'POST' : 'PUT';
    const url = slug === 'new' ? '/api/blog/create' : `/api/blog/update?id=${slug}`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/blog/${data?.data.id}`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };



  return (
    <div className="container mx-auto px-4 py-8  bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black">
        {slug === 'new' ? 'Create New Blog Post' : 'Edit Blog Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image URL</label>
          <input
            type="url"
            value={formData.featuredImage}
            onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
            className="mt-1 w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
            className="mt-1 w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300 h-32"
            maxLength="200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            className="mt-1 w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300 h-96"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <select
              // multiple
              value={formData.tags}
              onChange={e => setFormData({
                ...formData,
                tags: Array.from(e.target.selectedOptions, option => option.value)
              })}
              className="mt-1 capitalize w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300 "
            >
              {['technology', 'programming', 'web-development', 'design', 'career'].map(tag => (
                <option key={tag} value={tag} className=' capitalize'>{tag}</option>
              ))}
            </select>
          </div>

          {/* <div>
              <label className="block mb-2 font-medium">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div> */}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/blog')}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#7F265B] text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {slug === 'new' ? 'Create Blog' : 'Update Blog'}
          </button>
        </div>
      </form>
    </div>

  );
}

export default WithAuth(BlogEditor);