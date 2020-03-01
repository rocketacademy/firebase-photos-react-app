import * as React from 'react';
import Col from 'react-bootstrap/Col';

interface IProps {
  imageUrl: string;
}

export const ImageCard = (props: IProps) => {
  return (
    <Col xs={6} md={4}>
      <img alt='' src={props.imageUrl} />
    </Col>
  );
};
