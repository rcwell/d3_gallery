import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Radial = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Radial"
        },
    ];

    return (
        <RouteWrapper
            title={"Radial Bar Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Radial Bar Chart"
        </RouteWrapper>
    )
}