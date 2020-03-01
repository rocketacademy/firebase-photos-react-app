import { getToken } from '../firebase';

export enum RequestType {
  GET = 'GET',
  POST = 'POST'
}

// Retrieve user auth token from firebase user.
const authToken = async () => {
  const token = await getToken();
  return token;
};

export const getUserImageUrls = async (userImagesHook: Function) => {
  const endpoint =
    'https://us-central1-photos-react-app.cloudfunctions.net/images/';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    const responseText = xhr.responseText;
    userImagesHook(JSON.parse(responseText));
  });
  const token = await authToken();
  xhr.open(RequestType.GET, endpoint);
  xhr.setRequestHeader('Authorization', token);
  xhr.send();
};

export const saveUserImage = async () => {
  const endpoint =
    'https://us-central1-photos-react-app.cloudfunctions.net/images/';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    // TODO: Relevant updates based on response.
    console.log(xhr.responseText);
  });
  const token = await authToken();
  xhr.open(RequestType.POST, endpoint);
  xhr.setRequestHeader('Authorization', token);
  xhr.send();
};
