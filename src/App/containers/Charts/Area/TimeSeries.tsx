import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const TimeSeries = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "timeseries"
        },
    ];

    return (
        <RouteWrapper
            title={"Time Series Area Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Time Series Area Chart
        </RouteWrapper>
    )
}