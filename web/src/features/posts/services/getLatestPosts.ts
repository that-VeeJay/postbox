export const getLatestPosts = async () => {
   const response = await fetch('/api/posts/latest-posts');
   if (!response.ok) throw new Error('Error fetching all posts');
   return response.json();
};
