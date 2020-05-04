
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Bubble = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "Bubble"
        },
    ];

    return (
        <RouteWrapper
            title={"Bubble Map"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Bubble Map
        </RouteWrapper>
    )
}