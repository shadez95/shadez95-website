import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub, faTwitter, faYoutube, faInstagram, faGithubSquare, faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './all.scss';

library.add(faGithub, faTwitter, faYoutube, faInstagram, faGithubSquare, faTwitterSquare);

export const Layout: React.FC = ({ children }): JSX.Element => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data): JSX.Element => (
      <React.Fragment>
        <Helmet>
          <html className="has-navbar-fixed-top" lang="en" />
          <title>{data.site.siteMetadata.title}</title>
          <meta name="description" content={data.site.siteMetadata.description} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="https://shadez95.dev" />
          <meta property="og:image" content="/assets/shadez.png" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/js/all.js" integrity="sha256-aLNFps+os5n+KfcuxSD1/vOz7c/4tAq+Cnpspw9ZGYc=" crossOrigin="anonymous" />
        </Helmet>
        <Navbar />
        {children}
        <Footer />
      </React.Fragment>
    )}
  />
);
