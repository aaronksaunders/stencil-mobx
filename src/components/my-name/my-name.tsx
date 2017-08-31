import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss'
})
export class MyName {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    console.log(this.first)
    return (
      <p>
        Hello, my name is {this.first} {this.last}
      </p>
    );
  }
}
