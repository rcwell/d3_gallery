import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Icons = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "icons"
        },
    ];

    return (
        <RouteWrapper
            title={"Icons Scatter Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Icons Scatter Chart
        </RouteWrapper>
    )
}