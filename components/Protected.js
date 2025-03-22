import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        router.replace('/login'); // Redirect to login if not authenticated
      } else {
        setLoading(false);
      }
    }, []);

    if (loading) return <p>Loading...</p>;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
