import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <div>
        <Link to='/'>Home </Link>
        <Link to='/contact'>Contact Me </Link>
        <Link to='/weekly meal planner with grocery list '>
          weekly meal planner{' '}
        </Link>
      </div>
    </>
  );
}

export default NavBar;
