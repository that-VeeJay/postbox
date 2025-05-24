import { useMutation } from '@tanstack/react-query';
import { logout } from '../services/logout';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

export const useLogout = () => {
   const navigate = useNavigate();
   const { setUser, setToken, token } = useContext(UserContext);

   return useMutation({
      mutationFn: () => logout(token!),
      onSuccess: () => {
         setUser(null);
         setToken(null);
         localStorage.removeItem('token');
         navigate('/login');
      },
   });
};
