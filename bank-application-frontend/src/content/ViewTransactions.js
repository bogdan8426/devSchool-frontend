import { LitElement, html, css } from 'lit-element';
import { getTransactions } from '../Requests';
import { readUser } from '../storage';

export class ViewTransactions extends LitElement {
  constructor() {
    super();
    this._getTransactions();
  }

  async _getTransactions() {
    this.transactions = await getTransactions();
  }

  static get properties() {
    return {
      transactions: { type: Array },
    };
  }

  render() {
    return html`
      <section>
        <h1>Transaction history</h1>
        <ol>
          ${this.transactions
            ? this.transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(
                  transaction =>
                    html`<li>
                      <p>${transaction.date}</p>
                      <p>${this._with(transaction)}</p>
                      <p>${this._moneySign(transaction)}$${transaction.amount}</p>
                      <p><img src="./src/assets/${this._trasactionType(transaction)}.png" /></p>
                    </li>`
                )
            : "You haven't performed any transactions."}
        </ol>
        <button @click=${this._onClickBack}>Back</button>
      </section>
    `;
  }

  _moneySign(transaction) {
    const email = readUser().email;
    if (transaction.from === email) return '-';
    return '+';
  }

  _trasactionType(transaction) {
    const email = readUser().email;
    if (transaction.from === email) return 'output';
    return 'input';
  }

  _with(transaction) {
    const email = readUser().email;
    if (transaction.from === email) return `${transaction.to}`;
    return `${transaction.from}`;
  }

  _onClickBack() {
    window.location.hash = 'dashboard';
  }

  static get styles() {
    return css`
      section {
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

      ol {
        list-style-type: none;
      }

      li {
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        padding-bottom: 0rem;
      }

      li > p {
        display: inline-block;
        font-weight: bold;
      }

      li > p > img {
        width: 2rem;
        height: 1.5rem;
      }
    `;
  }
}

window.customElements.define('ba-view-transactions', ViewTransactions);
