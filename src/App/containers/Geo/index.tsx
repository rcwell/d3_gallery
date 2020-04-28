import React from 'react';
import Section from 'App/components/Section';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import RouteWrapper from 'App/components/RouteWrapper';
import { CardProps } from 'App/interface';
import { GeoMaps } from 'App/data';
import { SimpleWorldMap, Chrolopleth, Bubble, Pattern } from './Maps';

export const MainRoute = [
    {
        path: `/geo`,
        displayname: "geo"
    },
];

const Geo = () => {
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
                path={`${path}/simple-world-map`}
                component={SimpleWorldMap} />
            <Route
                path={`${path}/chrolopleth`}
                component={Chrolopleth} />
            <Route
                path={`${path}/bubble-map`}
                component={Bubble} />
            <Route
                path={`${path}/pattern-fill`}
                component={Pattern} />

            <Route
                path={path}
                component={() => (
                    <RouteWrapper
                        title={"Geo"}
                        description={"Lorem ipsum dolor sith amet"}
                        route={MainRoute}>
                        <Section
                            onCardClick={handleOnCardClick}
                            title={""}
                            description={""}
                            contents={GeoMaps} />
                    </RouteWrapper>
                )} />
        </Switch>
    );
};

export default Geo;