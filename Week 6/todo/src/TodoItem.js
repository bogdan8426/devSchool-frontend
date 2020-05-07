import { LitElement, html, css } from 'lit-element';
import { remove } from './storage';

export class TodoItem extends LitElement {
  static get properties() {
    return {
      id: { type: Number },
      text: { type: String },
      category: { type: String },
    };
  }

  render() {
    return html`
      <div>
        ${this.text}
        <button @click=${this._onRemove}>Remove</button>
      </div>
    `;
  }

  _onRemove() {
    remove(this);
    this.dispatchEvent(new CustomEvent('removed', { bubbles: true, composed: true }));
  }

  static get styles() {
    return css`
      :host {
        background: #2b2b2b;
        color: #2b2b2b;
        font-weight: bold;
        margin: 2rem;
        padding: 1rem;
        border-radius: 0.8rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      button {
        display: block;
        margin: 1rem;
        background-color: #2b2b2b;
        color: #c6a47e;
        font-variant-caps: all-small-caps;
        padding: 1rem;
        border-radius: 3rem;
        border: none;
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has('category')) {
      this.style.background = this.category;
    }
  }
}

window.customElements.define('todo-item', TodoItem);
