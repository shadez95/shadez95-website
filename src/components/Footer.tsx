import React from 'react';
import gatsbySVG from '../img/gatsby-horizontal.svg';

export const Footer: React.FC = (): JSX.Element => (
  <footer className="footer has-background-blue has-text-white-ter">
    <div className="container">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle">Powered By</p>
          </div>
          <div className="level-item">
            <a href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo-white.png" alt="Bulma" width="96" />
            </a>
            <div className="is-divider-vertical reduce-padding" />
            <a href="https://gatsbyjs.org">
              <img src={gatsbySVG} alt="GatsbyJS" width="112" />
            </a>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p className="subtitle">shadez95 © 2018</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
