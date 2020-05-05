import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppContent';

export class AppMain extends LitElement {
  render() {
    return html`
      <app-header></app-header>
      <app-content></app-content>
    `;
  }
}
