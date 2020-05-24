import { LitElement, html, css } from 'lit-element';
import { backendUrl } from '../constants/BackendUrl';
import { postTransaction } from '../Requests';
import { readUser } from '../storage';

export class RequestMoney extends LitElement {
  render() {
    return html`
      <section>
        <h1>Send request money notification</h1>
        <form @submit=${this._onSubmitTransaction}>
          Amount:
          <input type="number" placeholder="Amount" name="amount" required />
          Destination email:
          <input type="email" placeholder="Destination email" name="destination" required />

          <button @click=${this._onClickBack}>Back</button>
          <button type="submit">Send</button>
        </form>
      </section>
    `;
  }

  _onClickBack() {
    window.location.hash = 'dashboard';
  }

  async _onSubmitTransaction(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const transaction = Object.fromEntries(fd);
    if (transaction.destination === readUser().email) {
      alert('Cannot request money from yourself');
      return;
    }
    const response = await postTransaction(transaction, backendUrl.requestMoney);
    if (response) {
      alert('Request notification sent!');
      this._onClickBack();
    }
  }

  static get styles() {
    return css`
      section {
        text-align: left;
        background: #eee;
        box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
        padding: 1rem;
      }

      button {
        display: inline-block;
        background-color: rgb(105, 105, 105);
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        font-weight: bold;
        padding: 0.6rem 1.5rem;
        margin: 1rem 0.5rem;
        border-radius: 0.5rem;
        border-style: solid;
        border-color: rgb(105, 105, 105);
      }

      h1 {
        font-size: 2rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 4px;
        font-variant-caps: all-small-caps;
      }

      button[type='submit'] {
        background-color: rgb(255, 98, 0);
        color: rgb(255, 255, 255);
        border-color: rgb(255, 98, 0);
        float: right;
      }

      button[type='submit']:hover {
        background-color: rgb(255, 255, 255);
        color: rgb(255, 98, 0);
      }

      label {
        width: 100%;
        margin: 0.3rem 0;
        display: inline-block;
        box-sizing: border-box;
      }

      input {
        border: 2px solid #ccc;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        display: inline-block;
        width: 94%;
        padding: 15px;
        margin: 5px 0 22px 0;
      }
    `;
  }
}

window.customElements.define('ba-request-money', RequestMoney);
