import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const ColorFill = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "Color"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Color Fill Radar Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Color Fill Radar Chart
        </RouteWrapper>
    )
}