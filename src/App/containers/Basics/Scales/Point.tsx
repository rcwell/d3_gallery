
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const PointScale = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "point scale"
        },
    ];

    return (
        <RouteWrapper
            title={"Point Scale"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Point Scale
        </RouteWrapper>
    )
}