
import React from 'react';
import RouteWrapper from '../RouteWrapper';
import { MainRoute } from '../index';

export const Polygon = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "polygon"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Polygon"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Polygon
        </RouteWrapper>
    )
}
