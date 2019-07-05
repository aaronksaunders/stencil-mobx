import {action, extras, observable} from "mobx";
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

    public get unfinishedTodoCount() {
        return this.todos
            .slice()
            .filter((todo: Todo) => !todo.finished).length
    }

    @action
    public add(_value) {
        this.todos.push(new Todo(_value))
    }

    @action
    public removeTodo(_todo: Todo) {
        this.todos = this.todos.slice().filter(p => p.id !== _todo.id);
    }
}
