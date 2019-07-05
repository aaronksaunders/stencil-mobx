import {Component, h} from '@stencil/core';

@Component({
    tag: 'my-header',
    styleUrl: 'my-header.scss'
})
export class HeaderComponent {

    render() {
        return ([
            <h1 class="title">MobX With Stencil - Todo-List</h1>,
            <stencil-route-link
                url="/" >
                Show Name
            </stencil-route-link>,
            <button>
                <stencil-route-link
                url="/address" >
                Show Address
                </stencil-route-link>
            </button>
        ])
    }
}
