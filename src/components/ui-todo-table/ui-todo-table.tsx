import {Component, Event, EventEmitter, h, Prop} from "@stencil/core";
import {TodoItem} from "../models/todoItem";
import {TodoFinishedChangeEvent} from "../models/todo-finished-change.event";

@Component({
    tag: 'ui-todo-table',
    styleUrl: 'ui-todo-table.scss',
    shadow: true
})
export class UiTodoTable {

    @Prop()
    public todos: TodoItem[];

    @Event()
    public todoFinishedChange: EventEmitter<TodoFinishedChangeEvent>;

    private handleFinishedCheckbox(event: Event) {
        const checkbox = event.target as HTMLInputElement;
        const todoId = Number.parseFloat(checkbox.getAttribute('data-todoId'));
        this.todoFinishedChange.emit({todoId: todoId, isFinished: checkbox.checked})
    }

    private renderTodos() {
        return this.todos.map((t) => {
            return (<tr>
                <td class={(t.finished) ? 'finished' : ''}>{t.title}</td>
                <td class={(t.finished) ? 'finished' : ''}>{new Date(t.createdOn).toISOString()}</td>
                <td><input type="checkbox" value={(t.finished) ? 1 : 0}
                           data-todoId={t.id}
                           onChange={this.handleFinishedCheckbox.bind(this)}/></td>
            </tr>)
        })
    }

    render() {
        return (
            <table class="todo-table">
                <thead>
                <tr>
                    <th>Todo Title</th>
                    <th>Created At</th>
                    <th>Finished</th>
                </tr>
                </thead>
                <tbody>{this.renderTodos()}</tbody>
            </table>
        );
    }

}
