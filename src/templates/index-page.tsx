import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { Layout } from '../components/Layout';
import { NavbarItemIcon } from '../components/NavbarItemIcon';
import { IndexPageTemplateProps, IndexPageQuery } from '../CustomTypes';


const Padding = styled.div`
  padding-right: 25px;
`;

// This is a template page for both netlify admin interface
// and for use on actual website
export const IndexPageTemplate: FC<IndexPageTemplateProps> = ({
  title,
  subtitles,
  links,
}): JSX.Element => (
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
          {title}
        </h1>
        {subtitles.map(({ text }): JSX.Element => (
          <h2 key={v4()} className="subtitle">{text}</h2>
        ))}
        {links.length > 0 && (
          <div className="buttons">
            {links.map(({ fontawesomeIcon, url }): JSX.Element => {
              const iconArr = fontawesomeIcon.split(' ') as [IconPrefix, IconName];
              return (
                <Padding key={v4()}>
                  <NavbarItemIcon
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={iconArr}
                    size="3x"
                    navbarItem
                  />
                </Padding>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </section>
);

// This is what is actually rendered on website
const IndexPage: FC<IndexPageQuery> = ({ data }): JSX.Element => {
  const { frontmatter } = data.markdownRemark;
  return (
    <Layout>
      <IndexPageTemplate
        title={frontmatter.title}
        subtitles={frontmatter.subtitles}
        links={frontmatter.links}
      />
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        subtitles {
          text
        }
        links {
          fontawesomeIcon
          url
        }
      }
    }
  }
`;
