export const getPostByCategory = async (category: string) => {
   await new Promise((resolve) => setTimeout(resolve, 300));

   const response = await fetch(`/api/posts/category/${category}`);
   if (!response.ok) throw new Error('Error fetching post by a specific category');
   return response.json();
};
