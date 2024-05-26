import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

function NotFoundPage () {
    return <div>
        Sorry, page not found! Please go to <Link to='/'>home page</Link>!
</div>
}

export default NotFoundPage;