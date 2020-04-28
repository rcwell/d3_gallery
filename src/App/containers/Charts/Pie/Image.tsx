import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Image = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Image"
        },
    ];

    return (
        <RouteWrapper
            title={"Image Fill Pie Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Image Fill  Pie Chart
        </RouteWrapper>
    )
}