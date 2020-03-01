import * as React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

const ExifOrientationImg = require('react-exif-orientation-img');

interface IProps {
  imageUrl: string;
}

export const ImageCard = (props: IProps) => {
  return (
    <Col xs={6} md={4}>
      {/* <ExifOrientationImg
        src={props.imageUrl}
      /> */}
      <Image src={props.imageUrl} />
    </Col>
  );
};
