import React from 'react';
import Button from 'react-bootstrap/Button';

import { FilePicker } from 'react-file-picker';

const CustomButton = () => {
  return (
      <FilePicker
        extensions={['md']}
        onChange={FileObject => {}}
        onError={errMsg => {}}
      >
        <Button>Upload</Button>
      </FilePicker>
  );
};

export default CustomButton;
