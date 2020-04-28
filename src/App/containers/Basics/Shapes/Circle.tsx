
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Circle = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "circle"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Circle"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Circle
        </RouteWrapper>
    )
}