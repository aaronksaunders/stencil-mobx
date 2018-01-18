import { Component } from '@stencil/core';

@Component({
    tag: 'my-header',
    styleUrl: 'my-header.scss'
})
export class HeaderComponent {

    render() {
        return (
            [<h3>Router & Props Test w/Stencil </h3>,
            <stencil-route-link
                url="/" >
                Show Name
            </stencil-route-link>,
            <stencil-route-link
                url="/address" >
                Show Address
            </stencil-route-link>
            ])
    }
}