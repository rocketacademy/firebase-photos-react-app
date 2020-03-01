import React from 'react';
import { RequestType, authToken } from '../controllers/imageFetch';
import CustomButton from './CustomUploadButton';

const imageHandler = async (fileList: FileList) => {
  const fd = new FormData();
  Array.from(fileList).forEach((file: File) => {
    fd.append('image', file, file.name);
  });
  const endpoint =
    'https://us-central1-photos-react-app.cloudfunctions.net/images/';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    const responseText = xhr.responseText;
    console.log(responseText);
  });
  const token = await authToken();
  xhr.open(RequestType.POST, endpoint);
  xhr.setRequestHeader('Authorization', token);
  xhr.send();
};

interface IProps {}

const UploadButton = (props: IProps) => {
  return <CustomButton />;
};

export default UploadButton;
