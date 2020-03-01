import * as React from 'react';
import { ImageCard } from './ImageCard';
import Row from 'react-bootstrap/Row';

interface IProps {
  imageUrls: Array<string>;
}

const ImageWrap = (props: IProps) => {
  return (
    <Row noGutters={true}>
      {props.imageUrls.map((imageUrl: string) => {
        return <ImageCard key={imageUrl} imageUrl={imageUrl} />;
      })}
    </Row>
  );
};

export default ImageWrap;
