import { LitElement, html, css } from 'lit-element';

class AppContent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 2rem;
        height: 5rem;
      }
    `;
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}>
        <label
          >Please choose a year:
          <input type="number" name="year" min="2020" max="2030" />
        </label>
        <label
          >Please choose a title:
          <input type="string" name="title" />
        </label>
        <button>OK</button>
      </form>
    `;
  }

  _onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);
    this.dispatchEvent(new CustomEvent('submited', { detail: data }));
  }
}

window.customElements.define('app-content', AppContent);
