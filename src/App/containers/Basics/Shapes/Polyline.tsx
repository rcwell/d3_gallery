
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Polyline = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "polyline"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Polyline"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Polyline
        </RouteWrapper>
    )
}
