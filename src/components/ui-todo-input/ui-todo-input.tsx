import {Component, Event, EventEmitter, h, State} from "@stencil/core";
import {TodoItem} from "../models/todoItem";

@Component({
    tag: 'ui-todo-input',
    styleUrl: 'ui-todo-input.scss',
    shadow: true
})
export class UiTodoInput {

    @State() title: string;
    @Event() newTodo: EventEmitter;

    constructor() {
    }

    private handleAddClick(clickEvent: MouseEvent) {
        clickEvent.preventDefault();
        // add new todoItem
        this.newTodo.emit(new TodoItem(this.title));
        // reset title
        this.title = '';
    }

    render() {
        return (
            <form>
                <input class="input" placeholder="Enter new Todo Title"
                       value={this.title} onInput={(e: any) => {
                    this.title = e.target.value;
                }}/>
                <button type="submit" class="add-button" onClick={this.handleAddClick.bind(this)}>ADD</button>
            </form>
        );
    }
}
