// @ts-ignore
import {Component, h, State} from '@stencil/core';
import {autorun} from 'mobx';
import {todoListStore} from "../todo-list.store";
import {Todo} from "../models/todo";


@Component({
    tag: 'my-app',
    styleUrl: 'app.scss'
})
export class App {

    @State() title: string;
    @State() todos: Todo[];

    constructor() {

        autorun(() => {
            // this spread syntax has the advantage,
            // that `this.todos` is never undefined
            this.todos = [...todoListStore.todos];
        })
    }

    private handleAddClick(clickEvent: MouseEvent) {
        clickEvent.preventDefault();

        // add new \todo
        todoListStore.add(this.title);

        // reset title
        this.title = '';
    }

    private handleFinishedCheckbox(todo: Todo) {
        todo.finished = !todo.finished;
        todoListStore.replace(todo);
    }


    public renderTodos() {
        return this.todos.map((t) => {
            return (<tr>
                <td class={(t.finished) ? 'finished'  : ''}>{t.title}</td>
                <td>{new Date(t.createdOn).toISOString()}</td>
                <td><input type="checkbox" value={(t.finished) ? 1 : 0}
                           onChange={this.handleFinishedCheckbox.bind(this)}/></td>
            </tr>)
        })
    }
    render() {
        return (
            <div class="section">
                <my-header></my-header>
                <div class="level">
                    {/* This `form`-Tag allows the `Add`-Button to be triggered by pressing `Enter` on the keyboard */}
                    <form class="level-item">
                        <input class="input" placeholder="Enter new Todo Title"
                               value={this.title} onInput={(e: any) => {
                            this.title = e.target.value;
                        }} />
                        <button type="submit" class="add-button" onClick={this.handleAddClick.bind(this)}>ADD</button>
                    </form>
                    <h4 class="level-item">Unfinished: {todoListStore.unfinishedTodoCount}</h4>
                </div>

                <table class="todo-table">
                    <thead>
                    <tr>
                        <th>Todo Title</th>
                        <th>Created At</th>
                        <th>Finished</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTodos()}
                    </tbody>
                </table>
            </div >
        )
    }
}
