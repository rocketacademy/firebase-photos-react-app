import React from 'react';
import Button from 'react-bootstrap/Button';

import { FilePicker } from 'react-file-picker';

const CustomButton = ({ callback }) => {
  return (
    <FilePicker
      extensions={['jpg', 'jpeg', 'png']}
      onChange={fileList => {
        callback(fileList);
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
