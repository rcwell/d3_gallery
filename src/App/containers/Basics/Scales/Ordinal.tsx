
import React from 'react';
import RouteWrapper from '../RouteWrapper';
import { MainRoute } from '../index';

export const OrdinalScale = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "ordinal scale"
        },
    ];

    return (
        <RouteWrapper
            title={"Ordinal Scale"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Onrdinal Scale
        </RouteWrapper>
    )
}