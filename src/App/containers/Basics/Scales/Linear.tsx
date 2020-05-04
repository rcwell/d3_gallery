
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const LinearScale = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "linear scale"
        },
    ];

    return (
        <RouteWrapper
            title={"Linear Scale"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Linear Scale
        </RouteWrapper>
    )
}