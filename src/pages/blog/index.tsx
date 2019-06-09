import React from 'react';

import { Layout } from '../../components/Layout';
import { BlogRoll } from '../../components/BlogRoll';

const IndexBlog: React.FC = (): JSX.Element => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="content">
          <h1 className="has-text-weight-bold title is-size-1">
            Latest Stories
          </h1>
        </div>
        <BlogRoll />
      </div>
    </section>
  </Layout>
);

export default IndexBlog;
