import clsx from 'clsx';

export default function Title({
   title,
   textCenter = false,
}: {
   title: string;
   textCenter?: boolean;
}) {
   return (
      <div className={clsx('flex', { 'justify-center': textCenter })}>
         <h1 className="my-8 w-fit bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-4xl tracking-wide text-transparent">
            {title}
         </h1>
      </div>
   );
}
