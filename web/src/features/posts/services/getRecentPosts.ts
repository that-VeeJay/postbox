export const getRecentPosts = async () => {
   const response = await fetch('/api/posts/recent-posts');
   if (!response.ok) throw new Error('Error fetching recent posts');
   return response.json();
};
