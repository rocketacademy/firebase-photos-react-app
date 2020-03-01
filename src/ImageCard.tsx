import * as React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

interface IProps {
  imageUrl: string;
}

export const ImageCard = (props: IProps) => {
  return (
    <Col xs={6} md={4}>
      <Image src={props.imageUrl} />
    </Col>
  );
};
