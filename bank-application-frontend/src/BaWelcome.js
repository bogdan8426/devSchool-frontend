import { LitElement, html, css } from 'lit-element';

import './authentication/Register';
import './authentication/Login';

export class BaWelcome extends LitElement {
  static get properties() {
    return {
      page: { type: String },
    };
  }

  constructor() {
    super();
    this.page = window.location.hash.substring(1);
    window.onhashchange = this._onHashChange.bind(this);
  }

  render() {
    return html`
      <main @back=${this._onBack}>
        ${this._pageTemplate}
      </main>
    `;
  }

  get _pageTemplate() {
    if (this.page === 'register') {
      return html`<ba-register></ba-register>`;
    }
    if (this.page === 'login') {
      return html`<ba-login></ba-login>`;
    }
    if (this.page === 'dashboard') {
      return html`<ba-dashboard></ba-dashboard>`;
    } else {
      return html`
        <header>
          <h1>Welcome to the ING Bank Application</h1>
        </header>

        <button @click=${this._onChangeMenu} value="login">Login</button>
        <button @click=${this._onChangeMenu} value="register">Register</button>
      `;
    }
  }

  _onChangeMenu(event) {
    window.location.hash = event.target.value;
  }

  _onHashChange(event) {
    const hash = new URL(event.newURL).hash;
    this.page = hash.substring(1);
  }

  static get styles() {
    return css`
      main {
        text-align: center;
        color: rgb(51, 51, 51);
        margin: 3rem 7.5rem;
        margin-bottom: 2rem;
        padding: 1rem;
      }

      button {
        display: inline-block;
        background-color: rgb(255, 98, 0);
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        font-weight: bold;
        padding: 0.9rem;
        margin: 1rem 0.5rem;
        border-radius: 0.8rem;
        border-style: solid;
        border-color: rgb(255, 98, 0);
      }

      button:hover {
        background-color: rgb(255, 255, 255);
        color: rgb(255, 98, 0);
      }
    `;
  }
}
