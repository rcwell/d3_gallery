
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const Path = ({ location: { pathname } }: any) => {
    const routes = [
        MainRoute,
        {
            path: pathname,
            displayname: "path"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Path"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Path
        </RouteWrapper>
    )
}
