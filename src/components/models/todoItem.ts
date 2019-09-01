export class TodoItem {

    public readonly id: number;

    // Number of milliseconds from 1 January 1970 00:00:00
    public readonly createdOn: number;

    // Number of milliseconds from 1 January 1970 00:00:00
    public completedOn: number;

    public title: string;

    public finished: boolean;


    constructor(_title) {
        this.title = _title;
        this.id = Math.random();
        this.createdOn = new Date().getTime()
    }

    public setFinished(isFinished: boolean) {
        this.finished = isFinished;
        this.completedOn = this.finished ? new Date().getTime() : undefined
    }
}
