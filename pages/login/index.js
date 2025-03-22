import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const showSuccess = (message) => toast.success(`${message}! ✅`);
  const showError = (message) => toast.error(`${message}! ❌`);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, 'Check Token')
    if (token) {
      router.push("/blog");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(response, 'Response')
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store the token in localStorage
      router.push('/blog');
      showSuccess('Login Successfully')
    } else {
      showError(data.message)
    }
  };



  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-gray-800 text-center">Login to your Account</h2>
          <p className="text-gray-600 mb-4 text-center">See what is going on with your business</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="mail@abc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border p-2 text-black focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
              <a href="#" className="text-sm text-[#7F265B] hover:underline">Forgot Password?</a>
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#7F265B] p-2 text-white hover:bg-purple-700">
              Login
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-700">
            Not Registered Yet?{' '}
            <button onClick={() => router.push('/register')} className="text-[#7F265B] hover:underline">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}