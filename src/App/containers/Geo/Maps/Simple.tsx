
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const SimpleWorldMap = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "Simple"
        },
    ];

    return (
        <RouteWrapper
            title={"Simple World Map"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Simple World Map
        </RouteWrapper>
    )
}