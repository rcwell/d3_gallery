import React from 'react';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { FormattedAxis } from './FormattedAxis';
import { SingleAxis } from './SingleAxis';
import { XYAxis } from './XYAxis';
import {
    SingleAxes as SingleAxisIC,
    XYAxes as XYAxisIC,
    FormattedAxis as FormattedAxisIC
} from 'App/components/Icons';

const Axis = (props: RouteChildrenProps) => {
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
            <Route exact path={url + '/formatted-axis'} component={FormattedAxis} />
            <Route exact path={url + '/single-axis'} component={SingleAxis} />
            <Route exact path={url + '/x-y-axis'} component={XYAxis} />
            <Route exact path={url} >
                <Section
                    onCardClick={handleOnClick}
                    contents={routeCards} />
            </Route>
        </Switch>
    )
}

export default Axis;

const routeCards: Array<CardProps> = [
    {
        title: 'Single Axis',
        description: 'Lorem ipsum dolor sith amet',
        path: 'single-axis',
        icon: <SingleAxisIC/>
    },
    {
        title: 'X&Y Axis',
        description: 'Lorem ipsum dolor sith amet',
        path: 'x-y-axis',
        icon: <XYAxisIC/>
    },
    {
        title: 'Formatted Axis',
        description: 'Lorem ipsum dolor sith amet',
        path: 'formatted-axis',
        icon: <FormattedAxisIC/>
    }
];

// remove later
export * from './SingleAxis';
export * from './XYAxis';
export * from './FormattedAxis';