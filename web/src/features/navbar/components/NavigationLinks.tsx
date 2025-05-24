import { Link } from 'react-router-dom';

export function NavigationLinks() {
   return (
      <>
         <Link to="">Home</Link>
         <Link to="">Followed</Link>
         <Link to="/people">People</Link>
         <Link to="">Saved</Link>
      </>
   );
}
