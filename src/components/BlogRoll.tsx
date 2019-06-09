import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const P = styled.p`
  padding-top: 10px;
  padding-bottom: 10px;
`;

interface EdgeNode {
  id: string;
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    templateKey: string;
    date: string;
  };
}

interface BlogRollList {
  node: EdgeNode;
}

const query = graphql`
query BlogRollQuery {
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
  ) {
    edges {
      node {
        excerpt(pruneLength: 400)
        id
        fields {
          slug
        }
        frontmatter {
          title
          templateKey
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
}
`;

const usePostQuery = (): BlogRollList[] => {
  const data = useStaticQuery(query);
  const { allMarkdownRemark: { edges: posts } } = data;
  return posts;
};

export const BlogRoll: React.FC = (): JSX.Element => {
  const posts = usePostQuery();
  return (
    <div className="columns is-multiline">
      {posts
          && posts.map(({ node: post }): JSX.Element => (
            <div className="is-parent column is-6" key={post.id}>
              <article className="tile is-child box notification">
                <Link
                  className="title has-text-primary is-size-4"
                  to={post.fields.slug}
                >
                  {post.frontmatter.title}
                </Link>
                <P>
                  <span className="subtitle is-size-5">
                    {post.frontmatter.date}
                  </span>
                </P>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
    </div>
  );
};
