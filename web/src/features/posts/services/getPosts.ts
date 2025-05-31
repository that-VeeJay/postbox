export const getPosts = async (page: number) => {
   await new Promise((resolve) => setTimeout(resolve, 300));
   const response = await fetch(`/api/posts?page=${page}`);
   if (!response.ok) throw new Error('Error fetching the data');
   return response.json();
};
