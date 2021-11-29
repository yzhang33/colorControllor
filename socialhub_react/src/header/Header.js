import React from 'react';
import './Header.css';


function Header() {
    return (
        <header className="header">
          <h1> ITP Social Hub</h1>
          <div className='header-bottom'>
            <a className="projects" href="#project">Project</a>
          </div>
      </header>
    );
}


export default Header;
