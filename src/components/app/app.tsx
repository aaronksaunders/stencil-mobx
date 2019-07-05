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

    public renderTodos() {
        return this.todos.map((m) => {
            return (<tr>
                <td>{m.title}</td>
                <td>{new Date(m.createdOn).toISOString()}</td>
                <td>{m.finished}</td>
            </tr>)
        })
    }

    public handleAddClick(clickEvent: MouseEvent) {
        clickEvent.preventDefault();

        // add new \todo
        todoListStore.add(this.title);

        // reset title
        this.title = '';
    }

    render() {
        return (
            <div class="section">
                <my-header></my-header>
                <my-routes></my-routes>
                <div class="level">
                    {/* This `form`-Tag allows the `Add`-Button to be triggered by pressing `Enter` on the keyboard */}
                    <form class="level-item">
                        <input class="input"
                               placeholder="enter the title"
                               value={this.title}
                               onInput={(e: any) => {
                            this.title = e.target.value;
                        }} />
                        <button type="submit" class="button" onClick={this.handleAddClick.bind(this)}>ADD</button>
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
