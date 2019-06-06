import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { ATargetAttributes } from '../CustomTypes';

interface IconProps {
  icon: IconProp;
  href: string;
  target: ATargetAttributes;
  rel: string;
  bulmaColor?: string;
  size?: SizeProp;
}

export const NavbarItemIcon: React.FC<IconProps> = ({
  icon, href, target, rel, bulmaColor, size,
}): JSX.Element => (
  <a
    className="navbar-item"
    href={href}
    target={target}
    rel={rel}
  >
    <span className={`icon ${bulmaColor}`}>
      <FontAwesomeIcon icon={icon} size={size} />
    </span>
  </a>
);
