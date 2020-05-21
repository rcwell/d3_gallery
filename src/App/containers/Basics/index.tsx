import React from 'react';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import RouteWrapper from 'App/components/RouteWrapper';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';
import Routes from './Routes';
import {
    Rect, Circle, Ellipse, Line, Polygon, Polyline, Path, SingleAxes, XYAxes, FormattedAxis
} from 'App/components/Icons';

const Basics = () => {
    const { location, push } = useHistory();
    const { path, url } = useRouteMatch();

    const handleOnCardClick = ({ path }: CardProps) => {
        if (!path) return;
        push({
            ...location,
            pathname: `${url}/${path}`,
            state: { ...location.state, data: true }
        });
    };

    return (
        <Switch>
            <Route
                exact path={path}
                component={() => (
                    <RouteWrapper
                        title={"Basics"}
                        description={"Lorem ipsum dolor sith amet"}>
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Shapes"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.shapes} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Axis"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.axis} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Principal Scales"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.scales} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Plotting"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.plotting} />
                    </RouteWrapper>
                )} />
            <Route component={Routes} />
        </Switch>
    );
};

export default Basics;

const routeData = {
    shapes: [
        {
            title: 'Rect',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Rect />,
            code: '<rect/>',
            path: 'shapes/rect'
        },
        {
            title: 'Circle',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Circle />,
            code: '<circle/>',
            path: 'shapes/circle'
        },
        {
            title: 'Ellipse',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Ellipse />,
            code: '<ellipse/>',
            path: 'shapes/ellipse'
        },
        {
            title: 'Line',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Line />,
            code: '<line/>',
            path: 'shapes/line'
        },
        {
            title: 'Polygon',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Polygon />,
            code: '<polygon/>',
            path: 'shapes/polygon'
        },
        {
            title: 'Polyline',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Polyline />,
            code: '<polyline/>',
            path: 'shapes/polyline'
        },
        {
            title: 'Path',
            description: 'Lorem ipsum dolor sith amet',
            icon: <Path />,
            code: '<path/>',
            path: 'shapes/path'
        }
    ],
    axis: [
        {
            title: 'Single Axis',
            description: 'Lorem ipsum dolor sith amet',
            icon: <SingleAxes />,
            code: 'x-axis',
            path: 'axis/single-axis'
        },
        {
            title: 'X & Y Axis',
            description: 'Lorem ipsum dolor sith amet',
            icon: <XYAxes />,
            code: 'x-y-axis',
            path: 'axis/x-y-axis'
        },
        {
            title: 'Formatted Axis',
            description: 'Lorem ipsum dolor sith amet',
            icon: <FormattedAxis />,
            code: 'formatted-axis',
            path: 'axis/formatted-axis'
        }
    ],
    scales: [
        {
            title: 'Linear',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scales/linear'
        },
        {
            title: 'Band',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scales/band'
        },
        {
            title: 'Point',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scales/point'
        },
        {
            title: 'Ordinal',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scales/ordinal'
        },
        {
            title: 'Threshold',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scales/threshold'
        }
    ],
    plotting: [
        {
            title: 'Coordinatates',
            description: 'Lorem ipsum dolor sith amet',
            path: 'plotting/coordinates'
        },
        {
            title: 'Plotting',
            description: 'Lorem ipsum dolor sith amet',
            path: 'plotting/plot'
        }
    ]
}