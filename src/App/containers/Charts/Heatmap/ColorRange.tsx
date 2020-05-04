import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const ColorRange = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "Color-Range"
        },
    ];

    return (
        <RouteWrapper
            title={"Color Range Heatmap Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Color Range Heatmap Chart
        </RouteWrapper>
    )
}