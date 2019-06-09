import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { ATargetAttributes } from '../CustomTypes';

/**
 * IconProps are props for NavbarItemIcon
 */
interface IconProps {
  icon: IconProp;
  href: string;
  target: ATargetAttributes;
  rel: string;
  bulmaColor?: string;
  size?: SizeProp;
  navbarItem?: boolean;
  levelItem?: boolean;
}

export const NavbarItemIcon: React.FC<IconProps> = ({
  icon, href, target, rel, bulmaColor = '', size, navbarItem = false, levelItem = false,
}): JSX.Element => {
  let aClassName = '';
  if (navbarItem) {
    aClassName += 'navbar-item';
  }
  if (levelItem) {
    aClassName += 'level-item is-mobile';
  }
  return (
    <a
      className={aClassName}
      href={href}
      target={target}
      rel={rel}
    >
      <span className={`icon ${bulmaColor}`}>
        <FontAwesomeIcon icon={icon} size={size} />
      </span>
    </a>
  );
};
