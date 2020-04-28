
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Rect = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "rect"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Rect"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Rectangle
        </RouteWrapper>
    )
}
