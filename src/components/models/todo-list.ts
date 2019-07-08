import {action, computed, extras, observable} from "mobx";
import {Todo} from "./todo";

export class TodoList {

    [x: string]: any;

    @observable
    public todos: Todo[] = [];

    constructor() {
        // this allows multiple independent mobx instances per page
        // (good for isolated web components)
        extras.isolateGlobalState();
    }

    @computed
    public get unfinishedTodoCount() {
        return this.todos
            .filter((todo: Todo) => !todo.finished).length
    }

    @action
    public add(todoTitle: string) {
        this.todos.push(new Todo(todoTitle));
    }

    public replace(todo: Todo) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === todo.id);
        if (todoIndex !== -1) {
           this.todos = [...this.todos.splice(todoIndex, 1, todo)]
        }
    }

    @action
    public removeTodo(todo: Todo) {
        this.todos = this.todos.slice().filter(p => p.id !== todo.id);
    }
}
