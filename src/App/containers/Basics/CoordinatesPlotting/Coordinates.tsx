
import React from 'react';
import RouteWrapper from '../RouteWrapper';
import { MainRoute } from '../index';

export const Coordinates = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "coordinates"
        },
    ];

    return (
        <RouteWrapper
            title={"Coordinates"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Coordinates
        </RouteWrapper>
    )
}