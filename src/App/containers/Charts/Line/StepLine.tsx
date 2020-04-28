import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';

export const StepLine = ({ location: { pathname } }: any) => {
    const routes = [
        ...MainRoute,
        {
            path: pathname,
            displayname: "stepline"
        },
    ];
    
    return (
        <RouteWrapper
            title={"Step Line Chart"}
            route={routes}
            description={"Lorem ipsum dolor sith amet"}>
            Step Line Chart
        </RouteWrapper>
    )
}