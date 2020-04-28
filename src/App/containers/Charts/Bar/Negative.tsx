import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Negative = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Negative"
        },
    ];

    return (
        <RouteWrapper
            title={"Negative Bar Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Negative Bar Chart
        </RouteWrapper>
    )
}