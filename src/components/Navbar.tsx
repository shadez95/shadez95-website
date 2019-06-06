import React, { useState, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { v4 } from 'uuid';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { LinksList } from '../CustomTypes';
import { NavbarItemIcon } from './NavbarItemIcon';

interface VoidFunction {
  (): void;
}

interface LinksQuery {
  markdownRemark: {
    frontmatter: {
      links: LinksList[];
    };
  };
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

  const data = useStaticQuery(graphql`
    query LinksQuery {
      markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
        frontmatter {
          links {
            fontawesomeIcon
            url
          }
        }
      }
    }
  `) as LinksQuery;

  const { markdownRemark: { frontmatter: { links } } } = data;
  console.log(links);

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
              {links.length > 0
                && links.map(({ fontawesomeIcon, url }): JSX.Element => {
                  const iconArr = fontawesomeIcon.split(' ') as [IconPrefix, IconName];
                  return (
                    <NavbarItemIcon
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={iconArr}
                      key={v4()}
                      bulmaColor="has-text-warning"
                      size="lg"
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
