
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Simple = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "simple"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Simple Pie Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Simple Pie Chart
        </RouteWrapper>
    )
}