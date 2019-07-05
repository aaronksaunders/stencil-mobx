import {Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'my-address',
  //styleUrl: 'my-name.scss'
})
export class MyAddress {

  @Prop() street: string;
  @Prop() city: string;
  @Prop() state: string;

  render() {
    return (
      <p>
        My Address is {this.street} {this.city}  {this.state}
      </p>
    );
  }
}
