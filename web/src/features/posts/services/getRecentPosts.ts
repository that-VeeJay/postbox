export const getRecentPosts = async () => {
   const response = await fetch('/api/posts?type=recent');
   if (!response.ok) throw new Error('Error fetching recent posts');
   return response.json();
};
