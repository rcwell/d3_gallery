import React from 'react';
import { LinearScale, BandScale, PointScale, OrdinalScale, ThresholdScale } from './Scales';
import { Rect, Circle, Ellipse, Polyline, Polygon, Line, Path } from './Shapes';
import { BasicShapes, BasicAxis, BasicScales, CoordPlotting } from 'App/data';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import { SingleAxis, XYAxis, FormattedAxis } from './Axis';
import { Coordinates, Plotting } from './CoordinatesPlotting';
import RouteWrapper from 'App/components/RouteWrapper';
import Section from "App/components/Section";
import { CardProps } from 'App/interface';

export const MainRoute = [
    {
        path: `/basics`,
        displayname: "basics"
    },
];

const Basics = () => {
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
                path={`${path}/shapes/rect`}
                component={Rect} />
            <Route
                path={`${path}/shapes/circle`}
                component={Circle} />
            <Route
                path={`${path}/shapes/ellipse`}
                component={Ellipse} />
            <Route
                path={`${path}/shapes/line`}
                component={Line} />
            <Route
                path={`${path}/shapes/polygon`}
                component={Polygon} />
            <Route
                path={`${path}/shapes/polyline`}
                component={Polyline} />
            <Route
                path={`${path}/shapes/path`}
                component={Path} />

            <Route
                path={`${path}/axis/single-axis`}
                component={SingleAxis} />
            <Route
                path={`${path}/axis/x-y-axis`}
                component={XYAxis} />
            <Route
                path={`${path}/axis/formatted-axis`}
                component={FormattedAxis} />

            <Route
                path={`${path}/scales/linear`}
                component={LinearScale} />
            <Route
                path={`${path}/scales/band`}
                component={BandScale} />
            <Route
                path={`${path}/scales/point`}
                component={PointScale} />
            <Route
                path={`${path}/scales/ordinal`}
                component={OrdinalScale} />
            <Route
                path={`${path}/scales/threshold`}
                component={ThresholdScale} />

            <Route
                path={`${path}/coordinates-plotting/coordinates`}
                component={Coordinates} />
            <Route
                path={`${path}/coordinates-plotting/plotting`}
                component={Plotting} />

            <Route
                path={path}
                component={() => (
                    <RouteWrapper
                        title={"Basics"}
                        description={"Lorem ipsum dolor sith amet"}
                        route={MainRoute}>
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Shapes"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={BasicShapes} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Axis"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={BasicAxis} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Principal Scales"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={BasicScales} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Coordinates and Plotting"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={CoordPlotting} />
                    </RouteWrapper>
                )} />
        </Switch>
    );
};

export default Basics;