
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const ThresholdScale = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "threshold scale"
        },
    ];

    return (
        <RouteWrapper
            title={"Threshold Scale"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Threshold Scale
        </RouteWrapper>
    )
}