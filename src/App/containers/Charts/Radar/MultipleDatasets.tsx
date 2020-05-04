import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const MultipleDatasets = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "Multiple-Datasets"
        },
    ];

    return (
        <RouteWrapper
            title={"Multiple Datasets Radar Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Multiple Datasets Radar Chart
        </RouteWrapper>
    )
}