import React from 'react';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { Coordinates } from './Coordinates';
import { Plot } from './Plot';

const Plotting = (props: RouteChildrenProps) => {
    const location = props.location;
    const url = props.match!.url;
    const push = props.history.push;

    const handleOnClick = (card: CardProps) => {
        const { path } = card;

        if (!path) return;
        push({
            ...location,
            pathname: `${url}/${path}`
        });
    }

    return (
        <Switch>
            <Route exact path={url + '/coordinates'} component={Coordinates} />
            <Route exact path={url + '/plot'} component={Plot} />
            <Route exact path={url} >
                <Section
                    onCardClick={handleOnClick}
                    contents={routeCards} />
            </Route>
        </Switch>
    )
}

export default Plotting;

const routeCards: Array<CardProps> = [
    {
        title: 'Coordinates',
        description: 'Lorem ipsum dolor sith amet',
        path: 'coordinates',
    },
    {
        title: 'Plot',
        description: 'Lorem ipsum dolor sith amet',
        path: 'plot',
    }
];
