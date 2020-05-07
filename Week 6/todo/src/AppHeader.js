import { LitElement, html, css } from 'lit-element';

export class AppHeader extends LitElement {
  static get styles() {
    return css`
      header {
        background: #c6a47e;
        color: #2b2b2b;
        padding: 3rem;
        margin: 1rem;
        border-radius: 0.8rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 3px;
      }
    `;
  }

  render() {
    return html`
      <header>
        <h1>Todo list</h1>
      </header>
    `;
  }
}

window.customElements.define('app-header', AppHeader);
