export function read() {
  const data = window.localStorage.getItem('ds-contacts');
  return data === null ? [] : JSON.parse(data);
}

function write(contacts) {
  const data = JSON.stringify(contacts);
  window.localStorage.setItem('ds-contacts', data);
}

export function append(contact) {
  const contacts = read();

  contacts.push(contact);

  write(contacts);
}

export function deleteContactByIndex(index) {
  if (index > -1) {
    const contacts = read();
    contacts.splice(index, 1);
    write(contacts);
  }
}
