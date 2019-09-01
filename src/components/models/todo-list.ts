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
        // Array.push would also work at this place,
        // but I decided on this syntax to be consistent with the other setters,
        // which must replace the array for change detection of mobx to work.
        this.todos = [...this.todos, new TodoItem(todoTitle)];
    }

    @action
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
    public removeTodo(todoId: number) {
        // filter returns a new array, so change detection of mobx works as expected.
        this.todos = this.todos.filter(p => p.id !== todoId);
    }
}
