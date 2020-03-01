import React from 'react';
import Button from 'react-bootstrap/Button';

import { FilePicker } from 'react-file-picker';

const CustomButton = ({ imageHandler, hook }) => {
  return (
    <FilePicker
      extensions={['jpg', 'jpeg', 'png']}
      onChange={async fileList => {
        await imageHandler(fileList);
        // Add a five-seconds delay before reloading the library.
        await new Promise(resolve => setTimeout(resolve, 1000));
        hook(new Date().getMilliseconds());
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
