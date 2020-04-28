import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Column = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Column"
        },
    ];

    return (
        <RouteWrapper
            title={"Column Bar Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Column Bar Chart"
        </RouteWrapper>
    )
}