import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Pattern = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "Pattern"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Pattern Fill Pie Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Pattern Fill Pie Chart
        </RouteWrapper>
    )
}