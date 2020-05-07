import { LitElement, html, css } from 'lit-element';
import { append } from './storage';

export class TodoInputForm extends LitElement {
  render() {
    return html`
      <form @submit=${this._onSubmit}>
        Please enter your todo item:
        <textarea name="text" placeholder="Please enter your task content..." required></textarea>
        <select name="category">
          <option value="crimson">Category 1</option>
          <option value="dodgerblue">Category 2</option>
          <option value="darkolivegreen">Category 3</option>
        </select>
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

  static get styles() {
    return css`
      form {
        background: #2b2b2b;
        color: #c6a47e;
        margin: 0.5rem 3rem;
        padding: 1rem;
        border-radius: 0.8rem;
      }
      textarea {
        display: block;
        padding: 2rem;
        border-radius: 0.5rem;
        padding-left: 0.5rem;
        margin: 1rem;
      }
      select {
        display: block;
        border-radius: 0.5rem;
        padding-left: 0.5rem;
        margin: 1rem;
      }
      input {
        display: block;
        margin: 1rem;
        background-color: #c6a47e;
        font-variant-caps: all-small-caps;
        padding: 1rem;
        border-radius: 3rem;
        border: none;
      }
    `;
  }
}

window.customElements.define('todo-input-form', TodoInputForm);
