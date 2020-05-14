import { LitElement, html, css } from 'lit-element';

export class TodoLocation extends LitElement {
  constructor() {
    super();
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      pos => {
        const crd = pos.coords;
        const lat = crd.latitude;
        const long = crd.longitude;

        this.init(lat, long);
      },
      err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      options
    );
    this.address = 'N/A';
  }
  static get properties() {
    return {
      address: { type: Array },
    };
  }

  async init(lat, long) {
    const location = await this.fetchAddress(lat, long);
    if (location) {
      this.address = location.address;
      console.log(location.address);
    } else {
      console.log('error');
    }
    this.render();
  }

  async fetchAddress(lat, long) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  }

  render() {
    return html`
      <h1>
        Your address is : ${this.address.road},${this.address.city},${this.address.county}
      </h1>
    `;
  }
  static get styles() {
    return css`
      h1 {
        font-size: 0.5rem;
      }
    `;
  }
}

window.customElements.define('todo-location', TodoLocation);
