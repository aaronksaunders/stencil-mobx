import {action, computed, extras, observable} from "mobx";
import {TodoItem} from "./todoItem";

export class TodoList {

    [x: string]: any;

    @observable
    public todos: TodoItem[] = [];

    constructor() {
        // this allows multiple independent mobx instances per page
        // (good for isolated web components)
        extras.isolateGlobalState();
    }

    @computed
    public get unfinishedTodoCount() {
        return this.todos
            .filter((todo: TodoItem) => !todo.finished).length
    }

    @action
    public addTodoByTitle(todoTitle: string) {
        this.todos.push(new TodoItem(todoTitle));
    }

    public setFinished(todoId: number, isFinished: boolean) {
        const todoIndex = this.findTodoIndexById(todoId);
        if (todoIndex === -1) {
            console.error(`Todo Item with id "${todoId}" was not found. Can't set it's status to finished!`)
            return;
        }

        this.todos[todoIndex].setFinished(isFinished);
        this.refreshTodoList();
    }

    private refreshTodoList() {
        this.todos = [...this.todos];
    }

    private findTodoIndexById(todoId: number) {
        return this.todos.findIndex((todo) => todo.id === todoId);
    }

    @action
    public removeTodo(todo: TodoItem) {
        this.todos = this.todos.slice().filter(p => p.id !== todo.id);
    }
}
