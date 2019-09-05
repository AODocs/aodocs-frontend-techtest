import $ from 'jquery';

(<any>window).$ = $;

interface WindowGapi extends Window {
  onSignIn: (googleUser: any) => void;
}

const windowGapi = <WindowGapi>window;

let accessTokenRetrieved: (value: string) => void;
const accessTokenPromise = new Promise((resolve) => {
  accessTokenRetrieved = resolve;
});

windowGapi.onSignIn = (googleUser: any): void => {
  $('.g-signin2').remove();
  const accessToken = googleUser.getAuthResponse().access_token;

  accessTokenRetrieved(accessToken);
};

export interface RequestHeaders {
  [key: string]: string,
  Authorization: string,
  'Content-Type': string,
}

export async function getRequestHeaders(): Promise<RequestHeaders> {
  const userToken = await accessTokenPromise;

  return {
    Authorization: `Bearer ${userToken}`,
    'Content-Type': 'application/json',
  };
}
