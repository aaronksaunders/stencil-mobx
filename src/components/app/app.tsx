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

    /**
     * This local component state is needed, unfortunately,
     * to trigger the render function.
     * It would be nicer to directly access mobx state in render,
     * but this will not re-render currently.
     */
    @State() todos: TodoItem[];

    constructor() {

        // this updates the local component state property `this.todos`
        // to allow re-render of
        autorun(() => {
            // this spread syntax has the advantage over using .splice() on the mobx array,
            // that the local state property `this.todos` is never undefined,
            // if no mobix state is present yet.
            this.todos = [...todoListStore.todos];
        })
    }

    private handleTodoFinishedChange({detail: todoItem}) {
        todoListStore.setFinished(todoItem.todoId, todoItem.isFinished)
    }

    private handleDeleteTodoItem({detail: todoId}) {
        todoListStore.removeTodo(todoId)
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
                               onTodoFinishedChange={this.handleTodoFinishedChange.bind(this)}
                               onDeleteTodoItem={this.handleDeleteTodoItem.bind(this)}
                />
            </div >
        )
    }
}
