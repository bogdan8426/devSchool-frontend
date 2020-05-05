import { LitElement, html } from 'lit-element';

export class AppHeader extends LitElement {
  render() {
    return html`
      <header>
        <h1>Todo list application</h1>
      </header>
    `;
  }
}

window.customElements.define('app-header', AppHeader);
