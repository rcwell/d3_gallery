import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Bubble = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "bubble"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Bubble Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Bubble Chart
        </RouteWrapper>
    )
}