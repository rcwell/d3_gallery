import React from 'react';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import { Switch, Route, RouteChildrenProps } from 'react-router-dom';
import { Rect } from './Rect';
import { Circle } from './Circle';
import { Ellipse } from './Ellipse';
import { Line } from './Line';
import { Polygon } from './Polygon';
import { Polyline } from './Polyline';
import { Path } from './Path';
import {
    Rect as RectIC, Circle as CircleIC, Ellipse as EllipseIC, Line as LineIC,
    Polygon as PolygonIC, Polyline as PolylineIC, Path as PathIC
} from 'App/components/Icons';

const Shapes = (props: RouteChildrenProps) => {
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
            <Route exact path={url + '/polyline'} component={Polyline} />
            <Route exact path={url + '/polygon'} component={Polygon} />
            <Route exact path={url + '/path'} component={Path} />
            <Route exact path={url + '/line'} component={Line} />
            <Route exact path={url + '/ellipse'} component={Ellipse} />
            <Route exact path={url + '/circle'} component={Circle} />
            <Route exact path={url + '/rect'} component={Rect} />
            <Route exact path={url}>
                <Section
                    onCardClick={handleOnClick}
                    contents={routeCards} />
            </Route>
        </Switch>
    )
}

export default Shapes;

const routeCards: Array<CardProps> = [
    {
        title: 'Rect',
        description: 'Lorem ipsum dolor sith amet',
        code: '<rect/>',
        icon: <RectIC />,
        path: 'rect'
    },
    {
        title: 'Circle',
        description: 'Lorem ipsum dolor sith amet',
        code: '<rect/>',
        icon: <CircleIC />,
        path: 'circle'
    },
    {
        title: 'Ellipse',
        description: 'Lorem ipsum dolor sith amet',
        code: '<ellipse/>',
        icon: <EllipseIC />,
        path: 'ellipse'
    },
    {
        title: 'Path',
        description: 'Lorem ipsum dolor sith amet',
        code: '<path/>',
        icon: <PathIC />,
        path: 'path'
    },
    {
        title: 'Line',
        description: 'Lorem ipsum dolor sith amet',
        code: '<line/>',
        icon: <LineIC />,
        path: 'line'
    },
    {
        title: 'Polygon',
        description: 'Lorem ipsum dolor sith amet',
        code: '<polygon/>',
        icon: <PolygonIC />,
        path: 'polygon'
    },
    {
        title: 'Polyline',
        description: 'Lorem ipsum dolor sith amet',
        code: '<polyline/>',
        icon: <PolylineIC />,
        path: 'polyline'
    },
];

// remove later
export * from './Rect';
export * from './Circle';
export * from './Ellipse';
export * from './Line';
export * from './Polygon';
export * from './Polyline';
export * from './Path';