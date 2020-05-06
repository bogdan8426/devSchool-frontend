import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppFooter';
import './AppContent';

export class AppMain extends LitElement {
  static get properties() {
    return {
      year: { type: Number },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.year = 2020;
  }

  render() {
    return html`
      <app-header title=${this.title}>A</app-header>
      <app-content @submited=${this._onSubmission}>B</app-content>
      <app-footer year=${this.year}></app-footer>
    `;
  }

  _onSubmission(event) {
    if (event.detail.year) this.year = event.detail.year;
    if (event.detail.title) this.title = event.detail.title;
  }
}
