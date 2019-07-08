import {Component, Event, EventEmitter, h, State} from "@stencil/core";

@Component({
    tag: 'ui-todo-input',
    styleUrl: 'ui-todo-input.scss',
    shadow: true
})
export class UiTodoInput {

    @State() title: string;
    @Event() newTodoTitle: EventEmitter<string>;

    constructor() {
    }

    private handleAddClick(clickEvent: MouseEvent) {
        clickEvent.preventDefault();
        // add new todoItem
        this.newTodoTitle.emit(this.title);
        // reset title
        this.title = '';
    }

    render() {
        return (
            <form>
                {/* This `form`-Tag allows the `Add`-Button to be triggered by pressing `Enter` on the keyboard */}
                <input class="input" placeholder="Enter new Todo Title"
                       value={this.title} onInput={(e: any) => {
                    this.title = e.target.value;
                }}/>
                <button type="submit" class="add-button" onClick={this.handleAddClick.bind(this)}>ADD</button>
            </form>
        );
    }
}
