import { LitElement, html, css } from 'lit-element';
import { login } from '../Requests';

export class Login extends LitElement {
  render() {
    return html`
      <section>
        <h1>Login</h1>
        <form @submit=${this._onSubmitLogin}>
          Email
          <input type="email" placeholder="Enter email" name="email" required />

          Password
          <input type="password" placeholder="Enter Password" name="password" required />

          <button @click=${this._onClickBack}>Back</button>
          <button type="submit">Login</button>
        </form>
      </section>
    `;
  }

  _onClickBack() {
    window.location.hash = '';
  }

  async _onSubmitLogin(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const user = Object.fromEntries(fd);
    const response = await login(user);
    if (response) {
      // alert('Login successful!');
      const dialog = document.createElement('DIALOG');
      dialog.returnValue = 'login suces';
      dialog.show();
      window.location.hash = 'dashboard';
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

window.customElements.define('ba-login', Login);
