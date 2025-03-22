import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {

    setIsLoggedIn(false);
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    });
    localStorage.removeItem('token');
    if (response.ok) {

      router.replace('/login');
    }
  };

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
    console.log(token, 'token')
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);
  console.log(router.pathname, 'pathname')
  return (
    <nav className="bg-[#7F265B] p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <span className="text-[#fff] text-2xl font-bold">My Blog</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {['Home', 'News', 'Podcasts', 'Resources'].map((item) => (

            <span
              className={`cursor-pointer text-gray-400 hover:text-white px-3 py-2 rounded-md transition ${router.pathname === `/${item.toLowerCase()}` ? 'bg-gray-800 text-white' : ''
                }`}
            >
              {item}
            </span>

          ))}
        </div>

        {/* Contact Button */}


        {router.pathname !== '/login' ? (
          <button onClick={handleLogout} className=" hidden md:block  text-[#7F265B] bg-[#fff] px-4 py-2 rounded-lg font-bold  hover:text-black">Logout</button>
        ) : (
          <>

            <Link href={'/login'}>
              <button className="  hidden md:block text-[#7F265B] bg-[#fff] px-4 py-2 rounded-lg font-bold  hover:text-black">Login</button>
            </Link>


          </>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 p-4 flex flex-col space-y-2">
          {['Home', 'News', 'Podcasts', 'Resources'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <span className="cursor-pointer text-gray-400 hover:text-white block py-2">
                {item}
              </span>
            </Link>
          ))}


          {router.pathname !== '/login' ? (
            <button onClick={handleLogout} className="text-[#7F265B] bg-[#fff] px-4 py-2 rounded-lg font-bold w-full hover:text-black">Logout</button>
          ) : (

            <Link href={'/login'}>
              <button onClick={handleLogin} className="text-[#7F265B] bg-[#fff] px-4 py-2 rounded-lg font-bold w-full hover:text-black">Login</button>
            </Link>

          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
