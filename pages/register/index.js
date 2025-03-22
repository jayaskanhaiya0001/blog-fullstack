import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/login');
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      {/* <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form> */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">Create an Account</h2>
          <p className="text-gray-600 mb-4 text-center">Join us and start managing your business</p>
          {/* <button className="flex w-full items-center justify-center gap-2 rounded-lg border p-2 text-gray-700 shadow-sm hover:bg-gray-50">
            <FcGoogle className="text-xl" /> Continue with Google
          </button> */}
          <div className="my-4 text-center text-gray-500">or Register with Email</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 w-full text-black rounded-lg border p-2 focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border text-black p-2 focus:outline-none focus:ring focus:ring-purple-300"
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
                className="mt-1 w-full rounded-lg border text-black p-2 focus:outline-none focus:ring focus:ring-purple-300"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full rounded-lg bg-[#7F265B] p-2  text-white hover:bg-purple-700">
              Register
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-700">
            Already have an account?{' '}
            <button onClick={() => router.push('/login')} className="text-[#7F265B] hover:underline">
              Login Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}