import { backendUrl } from './constants/BackendUrl';
import { write, read } from './storage';

let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const requestOptions = {
  method: '',
  cors: 'no-cors',
  headers: myHeaders,
  body: '',
  redirect: 'follow',
};

export async function postNotification(notification) {
  requestOptions.method = 'POST';
  requestOptions.body = JSON.stringify(notification);
  requestOptions.headers.set('Authorization', read());

  const response = await fetch(backendUrl.respondToNotification, requestOptions);
  if (!response.ok) {
    handle(response);
    return null;
  } else {
    return response;
  }
}

export async function getTransactions() {
  requestOptions.method = 'GET';
  delete requestOptions.body;
  requestOptions.headers.set('Authorization', read());

  const response = await fetch(backendUrl.transactions, requestOptions);
  if (!response.ok) {
    handle(response);
    console.log(response);
    return response.status;
  } else {
    return response.json();
  }
}

export async function getUserDetails() {
  requestOptions.method = 'GET';
  delete requestOptions.body;
  requestOptions.headers.set('Authorization', read());

  const response = await fetch(backendUrl.getUserDetails, requestOptions);
  if (!response.ok) {
    handle(response);
    return response.status;
  } else {
    return response.json();
  }
}

export async function postTransaction(transaction, url) {
  requestOptions.method = 'POST';
  requestOptions.body = JSON.stringify(transaction);
  requestOptions.headers.set('Authorization', read());

  const response = await fetch(url, requestOptions);
  if (!response.ok) {
    handle(response);
    return null;
  } else {
    return response;
  }
}

export async function register(user) {
  requestOptions.method = 'POST';
  requestOptions.body = JSON.stringify(user);

  const response = await fetch(backendUrl.register, requestOptions);
  if (!response.ok) {
    handle(response);
    return null;
  }
  return response.json();
}

export async function login(user) {
  requestOptions.method = 'POST';
  requestOptions.body = JSON.stringify(user);

  const response = await fetch(backendUrl.login, requestOptions);
  if (!response.ok) {
    handle(response);
    return null;
  }

  for (const pair of response.headers.entries()) {
    if (pair[0] === 'authorization') {
      write(pair[1]);
      return 'hai ca merge!';
    }
  }
}

function handle(response) {
  if (response.status === 401)
    alert('You are not authorized for this request, please login first!');
  if (response.status === 403) alert('Incorrect email or password!');
  if (response.status === 409) alert('Email already registered!');
  if (response.status === 400) alert('Bad request!' + response);
  if (response.status === 500) alert('Error!' + response);
}
