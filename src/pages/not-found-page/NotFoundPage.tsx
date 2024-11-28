import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className='not-found-box'>
      <h1 className='not-found-title'>Error 404</h1>
      <p>Sorry, this page does not exist...</p>
      <Link to='/' className='not-found-link'>Go to back to the website</Link>
    </div>
  );
}

export default NotFoundPage;
