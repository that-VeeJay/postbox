export const getFeatured = async () => {
   const response = await fetch('/api/posts?type=featured');
   if (!response.ok) throw new Error('Error fetching featured posts');
   return response.json();
};
