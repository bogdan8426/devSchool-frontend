import { LitElement, html } from 'lit-element';
import './TodoItem';

export class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  render() {
    return html`
      <ul>
        ${this.todos.map(
          todo => html`<todo-item .id="${todo.id}" .text="${todo.text}"></todo-item>`
        )}
      </ul>
    `;
  }
}

window.customElements.define('todo-list', TodoList);
