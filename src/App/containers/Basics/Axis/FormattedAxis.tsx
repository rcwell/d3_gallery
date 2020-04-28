
import React from 'react';
import RouteWrapper from '../RouteWrapper';
import { MainRoute } from '../index';

export const FormattedAxis = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "formatted-axis"
        },
    ];

    return (
        <RouteWrapper
            title={"Formatted Axis"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Formatted Axis
        </RouteWrapper>
    )
}