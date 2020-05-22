import React from 'react';
import Section from 'App/components/Section';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import { getLastOfArray, capitalizeString } from 'App/utils';
import { SimpleWorldMap, Chrolopleth, Bubble, Pattern } from './Maps';
import RouteWrapper from 'App/components/RouteWrapper';
import { CardProps } from 'App/interface';

const Geo = () => {
    const { location, push } = useHistory();
    const { path, url } = useRouteMatch();

    const [page, setPage] = React.useState({
        title: "Geo",
        description: "Lorem ipsum dolor sith amet"
    });

    const handleOnCardClick = ({ path }: CardProps) => {
        if (!path) return;
        push({
            ...location,
            pathname: `${url}/${path}`
        });
    };

    React.useEffect(() => {
        setPage({
            description: "Lorem ipsum dolor sith amet",
            title: getLastOfArray(location.pathname.split('/')).split('-').map(capitalizeString).join(" ")
        });
    }, [location.pathname])

    return (
        <RouteWrapper
            title={page.title}
            description={page.description}>
            <Switch>
                <Route exact path={url + '/simple-world-map'} component={SimpleWorldMap} />
                <Route exact path={url + '/chrolopleth'} component={Chrolopleth} />
                <Route exact path={url + '/bubble-map'} component={Bubble} />
                <Route exact path={url + '/pattern-fill-map'} component={Pattern} />
                <Route
                    exact path={path}
                    component={() => (
                        <Section
                            onCardClick={handleOnCardClick}
                            contents={routeData} />
                    )} />
            </Switch>
        </RouteWrapper>
    );
};

export default Geo;

const routeData = [
    {
        title: 'Simple World Map',
        description: 'Lorem ipsum dolor sith amet',
        path: 'simple-world-map'
    },
    {
        title: 'Chrolopleth',
        description: 'Lorem ipsum dolor sith amet',
        path: 'chrolopleth'
    },
    {
        title: 'Bubble Map',
        description: 'Lorem ipsum dolor sith amet',
        path: 'bubble-map'
    },
    {
        title: 'Pattern Fill',
        description: 'Lorem ipsum dolor sith amet',
        path: 'pattern-fill'
    }
]