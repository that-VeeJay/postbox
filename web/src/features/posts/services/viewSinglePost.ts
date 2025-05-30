export const viewSinglePost = async ({ queryKey }: { queryKey: [string, string] }) => {
   await new Promise((resolve) => setTimeout(resolve, 300));
   const [, slug] = queryKey;
   const response = await fetch(`/api/posts/${slug}`);
   return response.json();
};
