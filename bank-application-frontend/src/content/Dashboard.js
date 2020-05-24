import { LitElement, html, css } from 'lit-element';
// import bell from "../assets/bell.png";
import { getUserDetails, postNotification } from '../Requests';
import { clear, writeUser } from '../storage';

export class Dashboard extends LitElement {
  constructor() {
    super();
    window.onhashchange = this._onHashChange.bind(this);
    this.notifications = [];
    this._init();
  }

  async _init() {
    const user = await getUserDetails();
    if (user === 401) {
      window.location.hash = '';
      return;
    }
    writeUser(user);
    this.fullName = user.fullName;
    this.balance = user.balance;
    this.notifications = user.notifications;

    const badge = this.shadowRoot.getElementById('badge');
    const notificationButton = this.shadowRoot.getElementById('notificationButton');
    if (this.notifications.length > 0) {
      badge.hidden = false;
      notificationButton.disabled = false;
    } else {
      badge.hidden = true;
      notificationButton.disabled = true;
    }
  }

  static get properties() {
    return {
      fullName: { type: String },
      balance: { type: String },
      notifications: { type: Array },
      page: { type: String },
    };
  }

  render() {
    return html`
      <div>
        ${this._pageTemplate}
      </div>
    `;
  }

  get _pageTemplate() {
    if (this.page === 'transactions') {
      return html`<ba-view-transactions></ba-view-transactions>`;
    }
    if (this.page === 'transactions/send') {
      return html`<ba-send-money></ba-send-money>`;
    }
    if (this.page === 'transactions/request') {
      return html`<ba-request-money></ba-request-money>`;
    } else {
      this._init();
      return html`
      <header>
        <button @click=${
          this._notificationsClicked
        } class="notification" title="Notifications" id="notificationButton">
          <span id="badge">
            ${this.notifications.length > 0 ? this.notifications.length : ''}
          </span>
        </button>
        <h1>Hello ${this.fullName}!</h1>
        <button @click=${this._onChangeMenu} value="" id="logout" title="Logout"></button>
      </header>

      <aside hidden id="notificationsList">
        <ol>
            ${this.notifications.map(
              notification =>
                html`<li>
                  <p>
                    ${notification.from} requested $${notification.amount} from you.
                  </p>
                  <button
                    @click=${this._onNotificationApproved}
                    id="${notification.id}"
                    title="Approve request"
                  >
                    &check;
                  </button>
                  <button
                    @click=${this._onNotificationDismissed}
                    id="${notification.id}"
                    title="Dismiss request"
                  >
                    &cross;
                  </button>
                </li>`
            )}
          </p>
        </ol>
      </aside>

      <main>
        <h2>Current balance: $${this.balance}</h2>
        <img src="./src/assets/transaction.png" />
        <img src="./src/assets/send.png" />
        <img src="./src/assets/request.png" />
        <button @click=${this._onChangeMenu} value="transactions">View transactions</button>
        <button @click=${this._onChangeMenu} value="transactions/send">Send money</button>
        <button @click=${this._onChangeMenu} value="transactions/request">Request money</button>
      </main>
      `;
    }
  }

  async _onNotificationApproved(event) {
    this._pushNotificationAndRefresh(event, true);
  }

  async _onNotificationDismissed(event) {
    this._pushNotificationAndRefresh(event, false);
  }

  async _pushNotificationAndRefresh(event, approved) {
    const notification = {
      notification: event.target.id,
      approved: approved,
    };
    postNotification(notification);
    this._init();
    if (this.notifications.length < 1) {
      this.shadowRoot.getElementById('notificationsList').hidden = true;
    }
  }

  _notificationsClicked() {
    const element = this.shadowRoot.getElementById('notificationsList');
    element.hidden = !element.hidden;
  }

  _onChangeMenu(event) {
    window.location.hash = event.target.value;
    if (event.target.value === '') {
      clear();
      window.location.reload(false);
    }
  }

  _onHashChange(event) {
    const hash = new URL(event.newURL).hash;
    this.page = hash.substring(1);
  }

  static get styles() {
    return css`
      header {
        background: rgb(255, 98, 0);
        color: rgb(255, 255, 255);
        box-shadow: 3px 3px 20px 2px rgba(0, 0, 0, 0.2);
        display: inline-block;
        width: 100%;
        border-radius: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
      }
      header > img {
        width: 2rem;
        height: 2rem;
      }
      h1 {
        display: inline-block;
        margin: 1rem;
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 0.5px;
      }

      .notification {
        padding: 0.6rem 1.5rem;
        margin: 1rem 4rem 0.5rem 0.5rem;
        position: relative;
        display: inline-block;
        background-image: url('./src/assets/bell.png');
        background-color: rgb(255, 98, 0);
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 2.5rem;
        height: 1rem;
        border: none;
      }

      .notification #badge {
        position: absolute;
        top: -10px;
        right: -2px;
        padding: 4px 8px;
        border-radius: 50%;
        background: red;
        color: white;
      }

      #logout {
        padding: 0.6rem 1.5rem;
        margin: 1rem 0.5rem;
        display: inline-block;
        background-image: url('./src/assets/logout.png');
        background-color: rgb(255, 98, 0);
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 2rem;
        height: 1.3rem;
        border: none;
        cursor: pointer;
      }
      #logout:hover {
        background-size: 2.1rem;
      }

      main {
        margin: 1rem;
        text-align: left;
        background: #eee;
        box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
      }

      h2 {
        color: rgb(255, 255, 255);
        background: rgb(105, 105, 105);
        border-radius: 0.5rem;
        width: 100%;
        text-align: center;
        margin: 1rem;
        padding: 1rem;
        font-size: 1rem;
        letter-spacing: 0.5px;
      }

      main > button {
        display: inline-block;
        background-color: rgb(105, 105, 105);
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        font-weight: bold;
        padding: 0.6rem 1.5rem;
        margin: 1rem 0.5rem;
        margin-top: 0rem;
        border-radius: 0.5rem;
        border-style: solid;
        border-color: rgb(105, 105, 105);
      }

      main > img {
        width: 10rem;
        height: 10rem;
        margin: 1rem;
        margin-bottom: 0rem;
      }

      ol {
        list-style-type: none;
        margin: 1rem;
        text-align: center;
        background: rgb(255, 98, 0);
        box-shadow: 3px 3px 10px 2px rgba(0, 0, 0, 0.6);
        padding: 1rem;
        position: fixed;
      }
      li {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        border-bottom: 1px solid rgb(168, 168, 168);
        border-top: 1px solid rgb(168, 168, 168);
        // align-content: space-between;
      }
      li > button {
        background: none;
        border: none;
      }
      li > p {
        color: rgb(255, 255, 255);
      }
    `;
  }
}

window.customElements.define('ba-dashboard', Dashboard);
