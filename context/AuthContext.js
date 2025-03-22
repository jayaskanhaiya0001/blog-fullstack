import { createContext, useContext, useEffect, useState } from 'react';
import { getSession, signOut } from 'next-auth/react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      setUser(session?.user || null);
    })();
  }, []);

  const value = {
    user,
    setUser,
    logout: async () => {
      await signOut();
      setUser(null);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}