// @ts-ignore
import {Component, h, State} from '@stencil/core';
import store from '../store';
import {autorun} from 'mobx';


@Component({
    tag: 'my-app',
    //styleUrl: 'my-name.scss'
})
export class App {

    @State() todos: any;
    @State() title: string;

    constructor() {
        autorun(() => {
            // console.log(store)
            console.log(store.unfinishedTodoCount)
            this.todos = store.todos.slice()
        })
    }

    renderTodos = () => {
        return this.todos ? this.todos.map((m) => {
            return (<div>{m.title} {m.createdOn}  {m.finished}</div>)
        }) : null
    };

    render() {
        return (
            <div class="section">
                <my-header></my-header>
                <my-routes></my-routes>
                <div class="level">
                    <div class="level-item">
                        <button class="button" onClick={() => store.add(this.title)}>ADD</button>
                        <input class="input" placeholder="enter the title" onChange={(e: any) => {
                            this.title = e.target.value
                            console.log(e.target.value)
                        }} />
                    </div>
                    <h4 class="level-item">Unfinished: {store.unfinishedTodoCount}</h4>
                </div>
                {this.renderTodos()}
            </div >
        )
    }
}
