import { LitElement, html, css } from 'lit-element';
import './TodoItem';

export class TodoList extends LitElement {
  static get properties() {
    return {
      todos: { type: Array },
    };
  }

  render() {
    return html`
      <div>
        <div class="legend">
          <p>Category 1: red</p>
          <p>Category 2: blue</p>
          <p>Category 3: green</p>
        </div>
        ${this.todos.map(
          todo =>
            html`<todo-item
              .id="${todo.id}"
              .text="${todo.text}"
              .category="${todo.category}"
            ></todo-item>`
        )}
      </div>
    `;
  }

  static get styles() {
    return css`
      div {
        background: #2b2b2b;
        color: #c6a47e;
        margin: 0.5rem 3rem;
        padding: 1rem;
        border-radius: 0.8rem;
      }
      .legend {
        border-style: solid;
        border-color: #c6a47e;
        position: fixed;
        right: 100px;
      }
    `;
  }
}

window.customElements.define('todo-list', TodoList);
