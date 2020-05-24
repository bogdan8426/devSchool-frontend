export function read() {
  const json = window.localStorage.getItem('ba-login');
  return json === null ? [] : JSON.parse(json);
}

export function write(login) {
  const json = JSON.stringify(login);
  window.localStorage.setItem('ba-login', json);
}

export function readUser() {
  const json = window.localStorage.getItem('ba-user');
  return json === null ? [] : JSON.parse(json);
}

export function writeUser(user) {
  const json = JSON.stringify(user);
  window.localStorage.setItem('ba-user', json);
}

export function clear() {
  window.localStorage.removeItem('ba-login');
  window.localStorage.removeItem('ba-user');
}
