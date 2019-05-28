import React from 'react';
import PropTypes from 'prop-types';
import { IndexPageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry }) => (
  <IndexPageTemplate
    title={entry.getIn(['data', 'title'])}
    subtitles={entry.getIn(['data', 'subtitles'])}
    links={entry.getIn(['data', 'links'])}
  />
);

IndexPagePreview.propTypes = {
  // eslint-disable-next-line react/require-default-props
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
};

export default IndexPagePreview;
