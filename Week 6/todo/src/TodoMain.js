import { LitElement, html, css } from 'lit-element';

import './TodoHeader';
import './TodoContent';

export class TodoMain extends LitElement {
  render() {
    return html`
      <todo-header></todo-header>
      <todo-content></todo-content>
    `;
  }
}
