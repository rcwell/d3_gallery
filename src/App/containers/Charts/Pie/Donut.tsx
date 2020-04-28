import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Donut = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Donut"
        },
    ];

    return (
        <RouteWrapper
            title={"Donut Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Donut Chart
        </RouteWrapper>
    )
}