import React from 'react';
import Section from 'App/components/Section';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import RouteWrapper from 'App/components/RouteWrapper';
import { CardProps } from 'App/interface';
import {
    Simple as Line__Simple,
    MultipleDatasets as Line__MultipleDatasets,
    Realtime as Line__Realtime,
    StepLine as Line__StepLine,
    TimeSeries as Line__TimeSeries,
} from './Line';
import {
    Simple as Area__Simple,
    MultipleDatasets as Area__MultipleDatasets,
    Realtime as Area__Realtime,
    Stacked as Area__Stacked,
    TimeSeries as Area__TimeSeries
} from './Area';
import {
    Simple as Bar__Simple,
    MultipleDatasets as Bar__MultipleDatasets,
    Negative as Bar__Negative,
    Radial as Bar__Radial,
    Stacked as Bar__Stacked,
    TimeSeries as Bar__TimeSeries,
    Column as Bar__Column
} from './Bar';
import {
    Simple as Heatmap__Simple,
    MultipleDatasets as Heatmap__MultipleDatasets,
    ColorRange as Heatmap__ColorRange,
} from './Heatmap';
import {
    Simple as Pie__Simple,
    Donut as Pie__Donut,
    Image as Pie__Image,
    Pattern as Pie__Pattern
} from './Pie';
import {
    Simple as Radar__Simple,
    MultipleDatasets as Radar__MultipleDatasets,
    ColorFill as Radar__ColorFill
} from './Radar';
import {
    Simple as Scatter__Simple,
    Icons as Scatter__Icons,
    Bubble as Scatter__Bubble
} from './Scatter';
import { LineCharts, AreaCharts, BarCharts, ScatterCharts, PieCharts, RadarCharts, HeatmapCharts } from 'App/data';

export const MainRoute = [
    {
        path: `/charts`,
        displayname: "charts"
    },
];

const Charts = () => {
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
                path={`${path}/line/simple`}
                component={Line__Simple} />
            <Route
                path={`${path}/line/realtime`}
                component={Line__Realtime} />
            <Route
                path={`${path}/line/step-line`}
                component={Line__StepLine} />
            <Route
                path={`${path}/line/time-series`}
                component={Line__TimeSeries} />
            <Route
                path={`${path}/line/multiple-datasets`}
                component={Line__MultipleDatasets} />

            <Route
                path={`${path}/area/simple`}
                component={Area__Simple} />
            <Route
                path={`${path}/area/realtime`}
                component={Area__Realtime} />
            <Route
                path={`${path}/area/stacked`}
                component={Area__Stacked} />
            <Route
                path={`${path}/area/time-series`}
                component={Area__TimeSeries} />
            <Route
                path={`${path}/area/multiple-datasets`}
                component={Area__MultipleDatasets} />

            <Route
                path={`${path}/bar/simple`}
                component={Bar__Simple} />
            <Route
                path={`${path}/bar/column`}
                component={Bar__Column} />
            <Route
                path={`${path}/bar/multiple-datasets`}
                component={Bar__MultipleDatasets} />
            <Route
                path={`${path}/bar/negative`}
                component={Bar__Negative} />
            <Route
                path={`${path}/bar/radial`}
                component={Bar__Radial} />
            <Route
                path={`${path}/bar/stacked`}
                component={Bar__Stacked} />
            <Route
                path={`${path}/bar/time-series`}
                component={Bar__TimeSeries} />


            <Route
                path={`${path}/heatmap/simple`}
                component={Heatmap__Simple} />
            <Route
                path={`${path}/heatmap/multiple-datasets`}
                component={Heatmap__MultipleDatasets} />
            <Route
                path={`${path}/heatmap/color-range`}
                component={Heatmap__ColorRange} />

            <Route
                path={`${path}/pie/simple`}
                component={Pie__Simple} />
            <Route
                path={`${path}/pie/donut`}
                component={Pie__Donut} />
            <Route
                path={`${path}/pie/image`}
                component={Pie__Image} />
            <Route
                path={`${path}/pie/pattern`}
                component={Pie__Pattern} />


            <Route
                path={`${path}/radar/simple`}
                component={Radar__Simple} />
            <Route
                path={`${path}/radar/multiple-datasets`}
                component={Radar__MultipleDatasets} />
            <Route
                path={`${path}/radar/color-fill`}
                component={Radar__ColorFill} />

            <Route
                path={`${path}/scatter/simple`}
                component={Scatter__Simple} />
            <Route
                path={`${path}/scatter/icons`}
                component={Scatter__Icons} />
            <Route
                path={`${path}/scatter/bubble`}
                component={Scatter__Bubble} />

            <Route
                path={path}
                component={() => (
                    <RouteWrapper
                        title={"Charts"}
                        description={"Lorem ipsum dolor sith amet"}
                        route={MainRoute}>
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Line"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={LineCharts} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Area"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={AreaCharts} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Bar"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={BarCharts} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Scatter"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={ScatterCharts} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Pie"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={PieCharts} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Radar"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={RadarCharts} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Heatmap"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={HeatmapCharts} />
                    </RouteWrapper>
                )} />
        </Switch>
    );
};

export default Charts;