import React from 'react';
import Button from 'react-bootstrap/Button';

import { FilePicker } from 'react-file-picker';

const CustomButton = ({ imageHandler, hook }) => {
  return (
    <FilePicker
      extensions={['jpg', 'jpeg', 'png']}
      onChange={async fileList => {
        await imageHandler(fileList);
        hook(null);
      }}
      onError={error => {
        console.error('Error picking files', error);
      }}
    >
      <Button>Upload</Button>
    </FilePicker>
  );
};

export default CustomButton;
