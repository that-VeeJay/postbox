export const getPostByCategory = async (category: string, page: number, sort: string) => {
   await new Promise((resolve) => setTimeout(resolve, 300));

   const response = await fetch(`/api/posts/category/${category}?page=${page}&sort=${sort}`);
   if (!response.ok) throw new Error('Error fetching post by a specific category');
   return response.json();
};
