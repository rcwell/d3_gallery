
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Line = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "line"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Line"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Line
        </RouteWrapper>
    )
}
