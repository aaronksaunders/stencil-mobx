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

    render() {
        return (
            <div class="section">
                <my-header/>

                <div class="flex-row">
                    <ui-todo-input onNewTodoTitle={(event: CustomEvent) => todoListStore.addTodoByTitle(event.detail)}/>
                    <h4 class="level-right">Unfinished: {todoListStore.unfinishedTodoCount}</h4>
                </div>

                <ui-todo-table todos={this.todos}
                               onTodoFinishedChange={
                                   ({detail}) => todoListStore.setFinished(detail.todoId, detail.isFinished)
                               }/>
            </div >
        )
    }
}
