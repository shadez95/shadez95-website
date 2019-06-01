import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { NavbarIcon } from './NavbarIcon';

interface VoidFunction {
  (): void;
}

export const Navbar: React.FC = (): JSX.Element => {
  const [active, setActive] = useState(false);
  const [darkNav, setDarkNav] = useState('');

  useEffect((): VoidFunction => {
    window.onscroll = function onScroll(): void {
      // 2 different if statements to avoid re-rendering
      // when it's unnecessary for better performance

      // Will only re-render when window is scrolled to top
      // and darkNav is not an empty string
      if (window.pageYOffset === 0 && darkNav !== '') setDarkNav('');

      // Will only re-render when window is scrolled down
      // and darkNav is empty string
      if (window.pageYOffset > 0 && darkNav === '') setDarkNav('has-background-grey-dark');
    };
    return (): void => {
      // Clean up window.onscroll event handler
      window.onscroll = null;
    };
  });

  function toggleHamburger(): void {
    setActive(!active);
  }

  const navBarActive = active ? 'is-active' : '';

  return (
    <nav className={`navbar is-fixed-top ${darkNav}`} role="navigation" aria-label="main-navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Home">
            <h1 className="title">shadez95</h1>
          </Link>
          {/* Hamburger menu - no need to assign key event */}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div
            className={`navbar-burger burger ${navBarActive}`}
            data-target="navMenu"
            aria-label="menu"
            aria-expanded="false"
            onClick={toggleHamburger}
            role="button"
            tabIndex={0}
          >
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navMenu" className={`navbar-menu ${navBarActive}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/products">
              Products
            </Link>
            <Link className="navbar-item" to="/blog">
              Blog
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
            <Link className="navbar-item" to="/contact/examples">
              Form Examples
            </Link>
          </div>
          <div className="navbar-end has-text-centered">
            <div className="buttons">
              <NavbarIcon href="https://github.com/shadez95" target="_blank" rel="noopener noreferrer" icon={faGithubSquare} />
              <NavbarIcon href="https://twitter.com/shadez95" target="_blank" rel="noopener noreferrer" icon={faTwitterSquare} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
