import { LitElement, html } from 'lit-element';
import { backendUrl } from '../constants/BackendUrl';

export class Balance extends LitElement {
  constructor() {
    super();
    this._getRequest();
  }

  properties() {
    return {
      balance: { type: Number },
    };
  }

  async _getRequest() {
    const response = await fetch(`${backendUrl.register}/1`);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.balance = data.balance;
    } else {
      console.log('error');
    }
  }

  render() {
    return html`
      <h1>Current balance is $${this.balance ? this.balance : '...Loading'}</h1>
      <a href="/dashboard" class="button">Back to dashboard</a>
    `;
  }
}

window.customElements.define('ba-balance', Balance);
