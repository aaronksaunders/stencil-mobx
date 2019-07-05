import {action} from 'mobx/lib/mobx';
import {extendObservable, extras} from 'mobx';

class TodoList { 
  
  [x: string]: any;

  constructor() {
    // this allows multiple independent mobx instances per page
    // (good for isolated web components)
    extras.isolateGlobalState();

    extendObservable(this, {
      todos: [],
      add: action(function add (_value) {
        this.todos.push( new Todo(_value))
      }),
      get unfinishedTodoCount () {
        return this.todos.slice().filter(todo => !todo.finished).length
      },
      removeTodo : action(function removeTodo(_todo:any) {
        this.todos = this.todos.slice().filter(p => p.id !== _todo.id);
      })
    })
  }
}


class Todo {
  id: any
  createdOn: any
  completedOn : any
  constructor(_title) {
    extendObservable(this, {
      title: _title,
      finished: false,
      toggleState: action(function toggleState() {
        this.finished = !this.finished
        this.completedOn = this.finished  ? new Date().getTime() : undefined
      })
    })

    this.id = Math.random()
    this.createdOn = new Date().getTime()

  }
}

export default new TodoList()
