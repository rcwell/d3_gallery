import React from 'react';
import { Switch, Route } from 'react-router-dom';

interface RouteProp {
    path: string;
    component: () => JSX.Element;
}
interface RoutesRendererProps {
    routes: Array<RouteProp>;
}

const RoutesRenderer = ({ routes }: RoutesRendererProps) => {
    return (
        <Switch>
            {
                routes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        component={component} />
                ))
            }
        </Switch>
    )
}

export default RoutesRenderer;