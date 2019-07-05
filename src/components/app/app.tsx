// @ts-ignore
import {Component, h, State} from '@stencil/core';
import store from '../todo-list.store';
import {computed} from 'mobx';


@Component({
    tag: 'my-app',
    //styleUrl: 'my-name.scss'
})
export class App {

    @State() title: string;

    constructor() {
    }

    @computed
    public get renderedTodos() {
        return store.todos.map((m) => {
            return (<div>{m.title} {new Date(m.createdOn).toISOString()}  {m.finished}</div>)
        })
    }

    render() {
        return (
            <div class="section">
                <my-header></my-header>
                <my-routes></my-routes>
                <div class="level">
                    <div class="level-item">
                        <button class="button" onClick={() => store.add(this.title)}>ADD</button>
                        <input class="input" placeholder="enter the title" onChange={(e: any) => {
                            this.title = e.target.value;
                            console.log(e.target.value);
                        }} />
                    </div>
                    <h4 class="level-item">Unfinished: {store.unfinishedTodoCount}</h4>
                </div>
                {this.renderedTodos}
            </div >
        )
    }
}
