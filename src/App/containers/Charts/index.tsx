import React from 'react';
import Section from 'App/components/Section';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import RouteWrapper from 'App/components/RouteWrapper';
import { LineCharts, AreaCharts, BarCharts, ScatterCharts, PieCharts, RadarCharts, HeatmapCharts } from 'App/data';
import { CardProps } from 'App/interface';
import * as Line from './Line';
import * as Area from './Area';
import * as Bar from './Bar';
import * as Heatmap from './Heatmap';
import * as Pie from './Pie';
import * as Radar from './Radar';
import * as Scatter from './Scatter';

export const MainRoute = {
    path: `/charts`,
    displayname: "charts"
};

const Charts = () => {
    const { location, push } = useHistory();
    const { path, url } = useRouteMatch();

    const handleOnCardClick = ({ d }: CardProps) => {
        if (!d) return;
        push({
            ...location,
            pathname: `${url}/${d.path}`,
            state: { ...location.state }
        });
    };

    return (
        <Switch>
            <Route
                path={`${path}/line`}
                component={LineRoutes} />
            <Route
                path={`${path}/area`}
                component={AreaRoutes} />
            <Route
                path={`${path}/bar`}
                component={BarRoutes} />
            <Route
                path={`${path}/scatter`}
                component={ScatterRoutes} />
            <Route
                path={`${path}/pie`}
                component={PieRoutes} />
            <Route
                path={`${path}/radar`}
                component={RadarRoutes} />
            <Route
                path={`${path}/heatmap`}
                component={HeatmapRoutes} />
            <Route
                path={path}
                component={() => (
                    <RouteWrapper
                        title={"Charts"}
                        description={"Lorem ipsum dolor sith amet"}
                        route={[MainRoute]}>
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


const LineRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Line.Simple} />
            <Route
                path={`${path}/realtime`}
                component={Line.Realtime} />
            <Route
                path={`${path}/step-line`}
                component={Line.StepLine} />
            <Route
                path={`${path}/time-series`}
                component={Line.TimeSeries} />
            <Route
                path={`${path}/multiple-datasets`}
                component={Line.MultipleDatasets} />
        </Switch>
    )
}

const AreaRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Area.Simple} />
            <Route
                path={`${path}/realtime`}
                component={Area.Realtime} />
            <Route
                path={`${path}/stacked`}
                component={Area.Stacked} />
            <Route
                path={`${path}/time-series`}
                component={Area.TimeSeries} />
            <Route
                path={`${path}/multiple-datasets`}
                component={Area.MultipleDatasets} />
        </Switch>
    )
}


const BarRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Bar.Simple} />
            <Route
                path={`${path}/column`}
                component={Bar.Column} />
            <Route
                path={`${path}/multiple-datasets`}
                component={Bar.MultipleDatasets} />
            <Route
                path={`${path}/negative`}
                component={Bar.Negative} />
            <Route
                path={`${path}/radial`}
                component={Bar.Radial} />
            <Route
                path={`${path}/stacked`}
                component={Bar.Stacked} />
        </Switch>
    )
}

const HeatmapRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Heatmap.Simple} />
            <Route
                path={`${path}/multiple-datasets`}
                component={Heatmap.MultipleDatasets} />
            <Route
                path={`${path}/color-range`}
                component={Heatmap.ColorRange} />
        </Switch>
    )
}

const PieRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Pie.Simple} />
            <Route
                path={`${path}/donut`}
                component={Pie.Donut} />
            <Route
                path={`${path}/image`}
                component={Pie.Image} />
            <Route
                path={`${path}/pattern`}
                component={Pie.Pattern} />
        </Switch>
    )
}

const RadarRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Radar.Simple} />
            <Route
                path={`${path}/color-fill`}
                component={Radar.ColorFill} />
        </Switch>
    )
}

const ScatterRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${path}/simple`}
                component={Scatter.Simple} />
            <Route
                path={`${path}/icons`}
                component={Scatter.Icons} />
            <Route
                path={`${path}/bubble`}
                component={Scatter.Bubble} />
        </Switch>
    )
}
