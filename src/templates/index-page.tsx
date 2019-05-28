import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { Layout } from '../components/Layout';

interface TextProps {
  text: string;
}

interface LinksList {
  fontawesomeIcon: string;
  url: string;
}

interface IndexPageTemplateProps {
  title: string;
  subtitles: TextProps[];
  links: LinksList[];
}

const A = styled.a`
  padding-left: 25px;
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
            {links.map(({ fontawesomeIcon, url }): JSX.Element => (
              <A
                className="navbar-item"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={v4()}
              >
                <span className="icon">
                  <i className={fontawesomeIcon} />
                </span>
              </A>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
);

interface Props {
  data: {
    markdownRemark: {
      frontmatter: IndexPageTemplateProps;
    };
  };
}

// This is what is actually rendered on website
const IndexPage: FC<Props> = ({ data }): JSX.Element => {
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
