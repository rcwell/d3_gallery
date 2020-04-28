
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const SingleAxis = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "single-axis"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Single Axis"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Single Axis
        </RouteWrapper>
    )
}