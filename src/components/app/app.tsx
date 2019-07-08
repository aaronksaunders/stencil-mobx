// @ts-ignore
import {Component, h, State} from '@stencil/core';
import {autorun} from 'mobx';
import {todoListStore} from "../todo-list.store";
import {TodoItem} from "../models/todoItem";


@Component({
    tag: 'my-app',
    styleUrl: 'app.scss'
})
export class App {

    @State() todos: TodoItem[];

    constructor() {

        autorun(() => {
            // this spread syntax has the advantage,
            // that `this.todos` is never undefined
            this.todos = [...todoListStore.todos];
        })
    }

    private handleFinishedCheckbox(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const todoId = Number.parseFloat(checkbox.getAttribute('data-todoId'));
        todoListStore.setFinished(todoId, checkbox.checked)
    }


    public renderTodos() {
        return this.todos.map((t) => {
            return (<tr>
                <td class={(t.finished) ? 'finished'  : ''}>{t.title}</td>
                <td class={(t.finished) ? 'finished' : ''}>{new Date(t.createdOn).toISOString()}</td>
                <td><input type="checkbox" value={(t.finished) ? 1 : 0}
                           data-todoId={t.id}
                           onChange={this.handleFinishedCheckbox.bind(this)}/></td>
            </tr>)
        })
    }
    render() {
        return (
            <div class="section">
                <my-header/>

                <div class="flex-row">
                    <ui-todo-input onNewTodoTitle={(event: CustomEvent) => todoListStore.addTodoByTitle(event.detail)}/>
                    <h4 class="level-right">Unfinished: {todoListStore.unfinishedTodoCount}</h4>
                </div>

                <table class="todo-table">
                    <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Created At</th>
                        <th>Finished</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderTodos()}</tbody>
                </table>
            </div >
        )
    }
}
