import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../app/store';
import { loginStart, loginSuccess, loginFailure, logout,rehydrate  } from '../app/store/slices/authSlice';
import { api } from '../lib/api';
import { useEffect } from 'react';
import { authStorage } from '../lib/authStorage';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error,isRehydrated } = useSelector((state: RootState) => state.auth);

  // Check for existing auth on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch(loginSuccess(userData));
      } catch (error) {
        localStorage.removeItem('auth_user');
        console.error("Getting error in checking existing auth:", error);
      }
     } else {
      dispatch(rehydrate()); // ✅ manually set flag
    }
  }, [dispatch]);

 const login = async (email: string, password: string) => {
  console.log("olp")
    dispatch(loginStart());
    try {
      console.log("olpo")
      const { token, user } = await api.login(email, password);
      authStorage.save(user, token);
      dispatch(loginSuccess({ user, token }));
    } catch (e: any) {
      dispatch(loginFailure(e?.message || 'Login failed'));
    }
  };

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('auth_user');
    dispatch(logout());
  };

  // Fix: Use correct property name 'rehydrate' instead of 'isRehydrated'
  return { user, isAuthenticated, isRehydrated, loading, error, login, logout: handleLogout };
};