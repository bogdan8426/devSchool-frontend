import { read, append, remove, update } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-delete').addEventListener('change', onChangeDelete);
  render();
  navigator.serviceWorker.register('sw.js');
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  data.set('id', Date.now());
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);
  const contacts = read();
  data.getAll('id').forEach(id => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      remove(contact);
    }
  });

  render();
}

function onChangeDelete(event) {
  const { form } = event.target;
  // const form = event.target.form;
  const data = new FormData(form);
  const hasChecked = data.getAll('id').length;
  form.elements.delete.disabled = !hasChecked;
}

// --------------------------------Homework-------------------------------- //

function getContactElements(contactClickedEvent) {
  const li = contactClickedEvent.target.parentNode;
  const label = li.children.item(0).children;
  return {
    id: label.item(0),
    name: label.item(1),
    email: label.item(2),
    phone: label.item(3),
    edit: li.children.item(1),
    cancel: li.children.item(2),
    save: li.children.item(3),
  };
}

function onClickEdit(event) {
  const clickedContact = getContactElements(event);
  setEditable(clickedContact, true);
}

function onSaveEdit(event) {
  const clickedContact = getContactElements(event);

  const editedContact = {
    id: clickedContact.id.value,
    name: clickedContact.name.value,
    email: clickedContact.email.value,
    phone: clickedContact.phone.value,
  };

  update(editedContact);

  renderOne(clickedContact);
}

function onCancelEdit(event) {
  const clickedContact = getContactElements(event);
  renderOne(clickedContact);
}

function renderOne(contact) {
  const contacts = read();
  for (const entry of contacts) {
    if (entry.id === contact.id.value) {
      contact.name.value = entry.name;
      contact.email.value = entry.email;
      contact.phone.value = entry.phone;

      setEditable(contact, false);
      return;
    }
  }
}

function setEditable(contact, editable) {
  contact.name.readOnly = !editable;
  contact.email.readOnly = !editable;
  contact.phone.readOnly = !editable;

  contact.cancel.hidden = !editable;
  contact.cancel.disabled = !editable;
  contact.save.hidden = !editable;
  contact.save.disabled = !editable;

  contact.edit.hidden = editable;
  contact.edit.disabled = editable;
}

function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
        <label>
          <input type="checkbox" name="id" value="${contact.id}">
          <input name="name" readonly value="${contact.name}">
          <input name="email" readonly value="${contact.email || 'N/A'}"> 
          <input name="phone" readonly value="${contact.phone || 'N/A'}">
        </label>
        <button type="button" name="edit">Edit</button>
        <button type="button" name="cancel" hidden disabled>Cancel</button>
        <button type="button" name="save" hidden disabled>Save</button>
      </li>
    `
  );

  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-delete').hidden = contacts.length === 0;

  document.getElementsByName('edit').forEach(btn => btn.addEventListener('click', onClickEdit));
  document.getElementsByName('save').forEach(btn => btn.addEventListener('click', onSaveEdit));
  document.getElementsByName('cancel').forEach(btn => btn.addEventListener('click', onCancelEdit));
}
