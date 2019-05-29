import React from 'react';
import { GatsbyImageProps } from 'gatsby-image';
import { PreviewCompatibleImage } from './PreviewCompatibleImage';

interface ImageSharp {
  childImageSharp: GatsbyImageProps;
}

interface FeatureGridProps {
  gridItems: {
    image?: ImageSharp | string;
    text: string;
  }[];
}

export const FeatureGrid: React.SFC<FeatureGridProps> = ({ gridItems }): JSX.Element => (
  <div className="columns is-multiline">
    {gridItems.map((item): JSX.Element => (
      <div key={item.text} className="column is-6">
        <section className="section">
          <div className="has-text-centered">
            <div
              style={{
                width: '240px',
                display: 'inline-block',
              }}
            >
              <PreviewCompatibleImage imageInfo={item} />
            </div>
          </div>
          <p>{item.text}</p>
        </section>
      </div>
    ))}
  </div>
);
