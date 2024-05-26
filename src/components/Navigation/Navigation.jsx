import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

const buidLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};


function Navigation () {
return <nav className={css.nav}>
          <ul className={css.list}>
            <li>
              <NavLink to='/' className={buidLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/movies' className={buidLinkClass}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
}

export default Navigation;