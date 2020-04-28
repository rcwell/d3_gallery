
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const BandScale = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "band scale"
        },
    ];

    return (
        <RouteWrapper
            title={"Band Scale"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Band Scale
        </RouteWrapper>
    )
}