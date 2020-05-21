import React from 'react';
import Section from 'App/components/Section';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import RouteWrapper from 'App/components/RouteWrapper';
import { CardProps } from 'App/interface';

export const MainRoute = {
    path: `/custom`,
    displayName: "Custom"
};

const Custom= () => {
    const { location, push } = useHistory();
    const { path, url } = useRouteMatch();

    const handleOnCardClick = ({ d }: CardProps) => {
        if (!d) return;
        push({
            ...location,
            pathname: `${url}/${d.path}`,
            state: { ...location.state, data: true }
        });
    };

    return (
        <Switch>
            <Route
                path={path}
                component={() => (
                    <RouteWrapper
                        title={"Custom Visualizations"}
                        description={"Lorem ipsum dolor sith amet"}
                        route={[MainRoute]}>
                        <Section
                            onCardClick={handleOnCardClick}
                            title={""}
                            description={""}
                            contents={[]} />
                    </RouteWrapper>
                )} />
        </Switch>
    );
};

export default Custom;