import React from 'react';
import Img, { GatsbyImageProps } from 'gatsby-image';

interface ImageSharp {
  childImageSharp: GatsbyImageProps;
}

interface PreviewCompatibleImageProps {
  imageInfo: {
    alt?: string;
    childImageSharp?: GatsbyImageProps;
    image?: ImageSharp | string;
    style?: object;
  };
}
export const PreviewCompatibleImage: React.FC<PreviewCompatibleImageProps> = ({
  imageInfo,
}): JSX.Element | null => {
  const imageStyle = { borderRadius: '5px' };
  const { alt = '', childImageSharp, image } = imageInfo;
  if (!!image && typeof image !== 'string') {
    return <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />;
  }
  if (childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }
  if (!!image && typeof image === 'string') { return <img style={imageStyle} src={image} alt={alt} />; }
  return null;
};
