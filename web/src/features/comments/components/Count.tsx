export function Count({ commentCount }: { commentCount: number }) {
   return (
      <>
         {commentCount >= 1 && (
            <div className="text-xl font-semibold">
               {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
            </div>
         )}
      </>
   );
}

