import {append, read, deleteContactByIndex} from './storage.js';

export function init(){
    window.addEventListener('DOMContentLoaded', onLoad);
}

function onLoad(event){


    document.getElementById('form-add')
        .addEventListener('submit', onSubmitAdd);
        
    document.getElementById('form-delete')
        .addEventListener('submit', onSubmitDelete);

    render();
        
}

function onSubmitAdd(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const contact = Object.fromEntries(formData);

    append(contact);
    render();
}

function onSubmitDelete(event){
    event.preventDefault();
    
    let indexArray = [];
    document.getElementsByName("delete").forEach(element => {
        if(element.checked){
            const li = element.closest('li');
            const liNodes = Array.from( li.closest('ul').children );
            const index = liNodes.indexOf(li);
            indexArray.push(index);
        }
    });

    while(indexArray.length > 0){
        deleteContactByIndex(indexArray.pop());
    }

    render();

}

function render(){
    const contacts = read();
    const list = document.getElementById('list');

    const items = contacts.map(contact => `
        <li>
            <input type="checkbox" name="delete"/>
            ${contact.name} &lt;${contact.email}&gt; (${contact.phone}) 
        </li>
    `);

    list.innerHTML = items.join('');
    const deleteButton = document.getElementById('delete-button');
    deleteButton.hidden = contacts.length === 0;
}