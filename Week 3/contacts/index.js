import { append, read, deleteContactByIndex } from './storage.js';

export function init() {
  window.addEventListener('DOMContentLoaded', onLoad);
}

function onLoad() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
  document.getElementById('list').addEventListener('click', checkboxChanged);
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const contact = Object.fromEntries(formData);

  append(contact);
  render();
}

function onSubmitDelete(event) {
  event.preventDefault();

  let indexArray = [];
  document.getElementsByName('delete').forEach(element => {
    if (element.checked) {
      const li = element.closest('li');
      const liNodes = Array.from(li.closest('ul').children);
      const index = liNodes.indexOf(li);
      indexArray.push(index);
    }
  });

  while (indexArray.length > 0) {
    deleteContactByIndex(indexArray.pop());
  }

  render();
}

function render() {
  const contacts = read();
  const list = document.getElementById('list');

  const items = contacts.map(
    contact => `
        <li>
            <input type="checkbox" name="delete"/>
            ${contact.name} &lt;${contact.email}&gt; (${contact.phone}) 
        </li>
    `
  );

  list.innerHTML = items.join('');
  const deleteButton = document.getElementById('delete-button');
  deleteButton.disabled = true;
  deleteButton.hidden = contacts.length === 0;
}

function checkboxChanged(event) {
  const checkbox = event.target;
  if (checkbox.type === 'checkbox') {
    const deleteButton = document.getElementById('delete-button');
    
    if (checkbox.checked) {
      deleteButton.disabled = false;
    } else {
      const liElements = document.getElementsByName('delete');
      for (let element of liElements) {
        if (element.checked) return;
      }
      // No checked elements
      deleteButton.disabled = true;
    }
  }
}
