import { LitElement, html } from 'lit-element';

import './AppHeader';
import './AppFooter';
import './AppContent';

export class AppMain extends LitElement {
  render() {
    return html`
      <app-header title="My App">A</app-header>
      <app-content>B</app-content>
      <app-footer year="2020"></app-footer>
    `;
  }
}
