
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const XYAxis = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "x&y-axis"
        },
    ];
    
    return (
        <RouteWrapper
            title={"X & Y Axis"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            X & Y Axis
        </RouteWrapper>
    )
}