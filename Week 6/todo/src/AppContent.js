import { LitElement, html } from 'lit-element';

import './TodoList';
import './TodoInputForm';
import { read } from './storage';

export class AppContent extends LitElement {
  constructor() {
    super();
    this.todos = read();
  }

  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  render() {
    return html`
      <todo-input-form @submited=${this._updateTodos}></todo-input-form>

      <todo-list @removed=${this._updateTodos} .todos=${this.todos}></todo-list>
    `;
  }

  _updateTodos() {
    this.todos = read();
  }
}

window.customElements.define('app-content', AppContent);
