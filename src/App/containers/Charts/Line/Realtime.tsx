import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Realtime = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Realtime"
        },
    ];

    return (
        <RouteWrapper
            title={"Realtime Line Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Realtime Line Chart
        </RouteWrapper>
    )
}