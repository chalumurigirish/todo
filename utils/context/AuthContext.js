import { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/utils/firebase';
import { register, login, logout } from '@/utils/context/loginFunctions';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const value = {
    register,
    login,
    logout,
    loggedInUser,
    setLoggedInUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser?.accessToken
        ? window.localStorage.setItem('accessToken', currentUser?.accessToken)
        : window.localStorage.removeItem('accessToken');

      setLoggedInUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
