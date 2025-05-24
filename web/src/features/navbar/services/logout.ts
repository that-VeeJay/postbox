export const logout = async (token: string) => {
   const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (!response.ok) {
      throw new Error('Failed to logout');
   }
   return true;
};
