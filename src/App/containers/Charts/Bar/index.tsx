import React from 'react';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { Simple } from './Simple';
import { Stacked } from './Stacked';
import { MultipleDatasets } from './MultipleDatasets';
import { Column } from './Column';
import { Negative } from './Negative';
import { Radial } from './Radial';

const routeCards: Array<CardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        path: 'simple',
        component: Simple
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
        path: 'multiple-datasets',
        component: MultipleDatasets
    },
    {
        title: 'Column',
        description: 'Lorem ipsum dolor sith amet',
        path: 'column',
        component: Column
    },
    {
        title: 'Stacked',
        description: 'Lorem ipsum dolor sith amet',
        path: 'stacked',
        component: Stacked
    },
    {
        title: 'Negative',
        description: 'Lorem ipsum dolor sith amet',
        path: 'negative',
        component: Negative
    },
    {
        title: 'Radial',
        description: 'Lorem ipsum dolor sith amet',
        path: 'radial',
        component: Radial
    }
];

const Bar = (props: RouteChildrenProps) => {
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

export default Bar;