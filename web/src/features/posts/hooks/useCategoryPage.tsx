import { useParams, useSearchParams } from 'react-router-dom';
import { useGetPostByCategory } from './useGetPostByCategory';
import { categories } from '@/data/categories';

export function useCategoryPage() {
   const { category } = useParams();
   const [searchParams, setSearchParams] = useSearchParams();

   const page = parseInt(searchParams.get('page') || '1');
   const sort = searchParams.get('sort') || 'newest';

   const { data, isLoading } = useGetPostByCategory(category!, page, sort);
   const posts = data?.data ?? [];

   const categoryExists = categories.find((cat) => String(cat.value) === category);
   const postExist = posts.length !== 0;

   const handleSetPage = (newPage: number) => {
      setSearchParams({ page: newPage.toString(), sort });
   };

   return {
      category,
      categoryExists,
      sort,
      posts,
      isLoading,
      data,
      postExist,
      handleSetPage,
      setSearchParams,
   };
}
