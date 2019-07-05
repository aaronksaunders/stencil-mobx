import {Component, h} from '@stencil/core';

@Component({
    tag: 'my-routes',
    //styleUrl: 'my-name.scss'
})
export class MyRoutes {

    render() {
        return (
            <stencil-router id="router">
                <stencil-route url="/" component="my-name"
                    componentProps={{ first: "Aaron", last: "Saunders" }}
                    exact={true}
                />
                <stencil-route url="/address"
                    component="my-address"
                    componentProps={{ 'city': "Washington", 'state': "DC" }}
                    exact={true} />
            </stencil-router>
        );
    }
}
