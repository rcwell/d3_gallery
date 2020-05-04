import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Stacked = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "stacked"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Stacked Bar Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Stacked Bar Chart
        </RouteWrapper>
    )
}