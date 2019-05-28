import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './all.scss';

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

          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />

          <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#ff4400" />
          <meta name="theme-color" content="#fff" />

          <meta property="og:type" content="business.business" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta property="og:url" content="/" />
          <meta property="og:image" content="/img/og-image.jpg" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/js/all.js" integrity="sha256-aLNFps+os5n+KfcuxSD1/vOz7c/4tAq+Cnpspw9ZGYc=" crossOrigin="anonymous" />
        </Helmet>
        <Navbar />
        {children}
        <Footer />
      </React.Fragment>
    )}
  />
);
