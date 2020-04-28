
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Ellipse = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "ellipse"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Ellipse"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Ellipse
        </RouteWrapper>
    )
}
