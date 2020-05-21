import React from 'react';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { BandScale } from './Band';
import { LinearScale } from './Linear';
import { OrdinalScale } from './Ordinal';
import { PointScale } from './Point';
import { ThresholdScale } from './Threshold';

const Scales = (props: RouteChildrenProps) => {
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
            <Route exact path={url + '/band-scale'} component={BandScale} />
            <Route exact path={url + '/linear-scale'} component={LinearScale} />
            <Route exact path={url + '/ordinal-scale'} component={OrdinalScale} />
            <Route exact path={url + '/point-scale'} component={PointScale} />
            <Route exact path={url + '/threshold-scale'} component={ThresholdScale} />
            <Route exact path={url} >
                <Section
                    onCardClick={handleOnClick}
                    contents={routeCards} />
            </Route>
        </Switch>
    )
}

export default Scales;

const routeCards: Array<CardProps> = [
    {
        title: 'Band Scale',
        description: 'Lorem ipsum dolor sith amet',
        path: 'band-scale',
    },
    {
        title: 'Linear Scale',
        description: 'Lorem ipsum dolor sith amet',
        path: 'linear-scale',
    },
    {
        title: 'Ordinal Scale',
        description: 'Lorem ipsum dolor sith amet',
        path: 'ordinal-scale',
    },
    {
        title: 'Point Scale',
        description: 'Lorem ipsum dolor sith amet',
        path: 'point-scale',
    },
    {
        title: 'Threshold Scale',
        description: 'Lorem ipsum dolor sith amet',
        path: 'threshold-scale',
    }
];

// remove later
export * from './Band';
export * from './Linear';
export * from './Ordinal';
export * from './Point';
export * from './Threshold';