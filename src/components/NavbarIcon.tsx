import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface NavbarIconProps {
  href: string;
  target: string;
  rel: string;
  icon: IconProp;
}

export const NavbarIcon: React.FC<NavbarIconProps> = ({
  href,
  target,
  rel,
  icon,
}): JSX.Element => (
  <a
    className="navbar-item"
    href={href}
    target={target}
    rel={rel}
  >
    <span className="icon has-text-warning">
      <FontAwesomeIcon icon={icon} size="2x" />
    </span>
  </a>
);
