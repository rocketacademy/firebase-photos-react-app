import { authToken } from '../firebase';

export enum RequestType {
  GET = 'GET',
  POST = 'POST'
}

export const endpoint =
  'https://us-central1-photos-react-app.cloudfunctions.net/images/';

export const getUserImageUrls = async (userImagesHook: Function) => {
  try {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
      const responseText = xhr.responseText;
      userImagesHook(JSON.parse(responseText));
    });
    const token = await authToken();
    xhr.open(RequestType.GET, endpoint);
    xhr.setRequestHeader('Authorization', token);
    xhr.send();
  } catch (err) {
    console.error(err);
  }
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
