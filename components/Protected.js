import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const WithAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (!token) {
      router.replace('/login'); // Redirect to login if not authenticated
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;
  return children;
};

export default WithAuth;
