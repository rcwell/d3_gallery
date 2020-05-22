import React from 'react';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { Simple } from './Simple';
import { Icons } from './Icons';
import { Bubble } from './Bubble';

const routeCards: Array<CardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        path: 'simple',
        component: Simple
    },
    {
        title: 'Bubble',
        description: 'Lorem ipsum dolor sith amet',
        path: 'bubble',
        component: Bubble
    },
    {
        title: 'Icons',
        description: 'Lorem ipsum dolor sith amet',
        path: 'icons',
        component: Icons
    }
];

const Scatter = (props: RouteChildrenProps) => {
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
            {routeCards.map(x => (
                <Route exact key={`${url}/${x.path}`} path={`${url}/${x.path}`} component={x.component} />
            ))}
            <Route exact path={url}>
                <Section
                    onCardClick={handleOnClick}
                    contents={routeCards} />
            </Route>
        </Switch>
    )
}

export default Scatter;