import React from 'react';
import { RequestType, endpoint } from '../controllers/imageFetch';
import CustomButton from './CustomUploadButton';
import firebase from 'firebase';
import { authToken } from '../firebase';

// Handles the picked image after the user picks it.
const imageHandler = async (imageFile: File) => {
  console.log('Handling picked file', imageFile);
  try {
    const imageUrl = await handleImageUpload(imageFile);
    await handleImageUrl(imageUrl);
  } catch (err) {
    console.error(err);
  }
};

// Uploads the image to firebase storage.
const handleImageUpload = async (imageFile: File) => {
  // Create a root reference to firebase storage.
  const storageRef = firebase.storage().ref();
  // Create a reference to the image file name.
  var imageRef = storageRef.child(imageFile.name);
  // Upload the file to fire storage.
  const url = await imageRef.put(imageFile).then(async function(snapshot) {
    const imageUrl = await snapshot.ref.getDownloadURL();
    console.log(
      `Uploaded ${imageFile.name}!`,
      'Image is accessible at',
      imageUrl
    );
    return imageUrl as string;
  });
  return url;
};

// Adds a new document containing the uploaded image url on firestore.
const handleImageUrl = async (imageUrl: string) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    const responseText = xhr.responseText;
    console.log(responseText);
  });
  const token = await authToken();
  xhr.open(RequestType.POST, endpoint);
  xhr.setRequestHeader('Authorization', token);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  const body = JSON.stringify({ imageUrl: imageUrl });
  console.log('Posting', body);
  xhr.send(body);
};

interface IProps {}

const UploadButton = (props: IProps) => {
  return <CustomButton callback={imageHandler} />;
};

export default UploadButton;
