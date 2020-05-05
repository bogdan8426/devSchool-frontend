import { LitElement, html } from 'lit-element';
import { remove } from './storage';

export class TodoItem extends LitElement {
  static get properties() {
    return {
      id: { type: Number },
      text: { type: String },
    };
  }

  render() {
    return html`
      <li name="todo-li">${this.text}</li>
      <button @click=${this._onRemove}>Remove</button>
    `;
  }

  _onRemove() {
    remove(this);
    this.dispatchEvent(new CustomEvent('removed', { bubbles: true, composed: true }));
  }
}

window.customElements.define('todo-item', TodoItem);
