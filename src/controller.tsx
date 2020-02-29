export const getDecodedId = (token: string) => {
  const endpoint =
    'https://us-central1-photos-react-app.cloudfunctions.net/images/';
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    // TODO: Relevant updates based on response.
    console.log(xhr.responseText);
  });
  xhr.open('GET', endpoint);
  xhr.setRequestHeader('Authorization', token);
  xhr.send();
};
