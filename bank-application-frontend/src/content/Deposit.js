import { LitElement, html } from "lit-element";

export class Deposit extends LitElement {
  render() {
    return html`
      <h1>Deposit</h1>
      <a href="/dashboard" class="button">Back to dashboard</a>
    `;
  }
}

window.customElements.define("ba-deposit", Deposit);
