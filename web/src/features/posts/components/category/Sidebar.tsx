import { categories } from '@/data/categories';
import { Link } from 'react-router-dom';
import { CustomBadge } from '@/components/shared';

export default function Sidebar({ activeCategory }: { activeCategory: string }) {
   return (
      <section className="s block h-[max-content] space-y-10">
         <div className="space-y-5">
            <h2>EXPLORE OTHER CATEGORY</h2>
            <div className="flex flex-wrap gap-3">
               {categories.map((item) => (
                  <Link to={`/category/${item.value}`} key={item.id} className="block">
                     <CustomBadge
                        text={item.value}
                        isActive={String(item.value) === activeCategory}
                     />
                  </Link>
               ))}
            </div>
         </div>
         <div className="space-y-5">
            <h2>DISCOVER CREATORS</h2>
         </div>
      </section>
   );
}
