import { LitElement, html } from 'lit-element';
import { append } from './storage';

export class TodoInputForm extends LitElement {
  render() {
    return html`
      <form @submit=${this._onSubmit}>
        Please enter your todo item:
        <textarea name="text" placeholder="I have to do this task..." required></textarea>
        <input name="save" type="submit" value="Save" />
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    fd.set('id', Date.now());
    const data = Object.fromEntries(fd);
    append(data);
    this.dispatchEvent(new CustomEvent('submited'));
  }
}

window.customElements.define('todo-input-form', TodoInputForm);
