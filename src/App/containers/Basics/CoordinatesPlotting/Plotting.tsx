
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Plotting = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "plotting"
        },
    ];

    return (
        <RouteWrapper
            title={"Plotting"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Plotting
        </RouteWrapper>
    )
}