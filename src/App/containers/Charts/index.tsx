import React from 'react';
import Section from 'App/components/Section';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import RouteWrapper from 'App/components/RouteWrapper';
import { CardProps } from 'App/interface';
import Routes from './routes';

const Charts = () => {
    const { location, push } = useHistory();
    const { path, url } = useRouteMatch();

    const handleOnCardClick = ({ path }: CardProps) => {
        push({
            ...location,
            pathname: `${url}/${path}`
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
                            title={"Line"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.line} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Area"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.area} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Bar"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.bar} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Scatter"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.scatter} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Pie"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.pie} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Radar"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.radar} />
                        <Section
                            onCardClick={handleOnCardClick}
                            title={"Heatmap"}
                            description={"Lorem ipsum dolor sith amet"}
                            contents={routeData.heatmap} />
                    </RouteWrapper>
                )} />
            <Route component={Routes} />
        </Switch>
    );
};

export default Charts;

const routeData = {
    line: [
        {
            title: 'Simple',
            description: 'Lorem ipsum dolor sith amet',
            path: 'line/simple'
        },
        {
            title: 'Step Line',
            description: 'Lorem ipsum dolor sith amet',
            path: 'line/stepline'
        },
        {
            title: 'Multiple Datasets',
            description: 'Lorem ipsum dolor sith amet',
            path: 'line/multiple-datasets'
        },
        {
            title: 'Time Series',
            description: 'Lorem ipsum dolor sith amet',
            path: 'line/time-series'
        }
    ],
    area: [
        {
            title: 'Simple',
            description: 'Lorem ipsum dolor sith amet',
            path: 'area/simple'
        },
        {
            title: 'Multiple Datasets',
            description: 'Lorem ipsum dolor sith amet',
            path: 'area/multiple-datasets'
        },
        {
            title: 'Stacked',
            description: 'Lorem ipsum dolor sith amet',
            path: 'area/stacked'
        },
        {
            title: 'Time Series',
            description: 'Lorem ipsum dolor sith amet',
            path: 'area/time-series'
        }
    ],
    bar: [
        {
            title: 'Simple',
            description: 'Lorem ipsum dolor sith amet',
            path: 'bar/simple'
        },
        {
            title: 'Column',
            description: 'Lorem ipsum dolor sith amet',
            path: 'bar/column'
        },
        {
            title: 'Multiple Datasets',
            description: 'Lorem ipsum dolor sith amet',
            path: 'bar/multiple-datasets'
        },
        {
            title: 'stacked',
            description: 'Lorem ipsum dolor sith amet',
            path: 'bar/stacked'
        },
        {
            title: 'negative',
            description: 'Lorem ipsum dolor sith amet',
            path: 'bar/negative'
        },
        {
            title: 'Radial',
            description: 'Lorem ipsum dolor sith amet',
            path: 'bar/radial'
        }
    ],
    scatter: [
        {
            title: 'Simple',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scatter/simple'
        },
        {
            title: 'Bubble',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scatter/bubble'
        },
        {
            title: 'Icon',
            description: 'Lorem ipsum dolor sith amet',
            path: 'scatter/icon'
        }
    ],
    radar: [
        {
            title: 'Simple',
            description: 'Lorem ipsum dolor sith amet',
            path: 'radar/simple'
        },
        {
            title: 'Color Fill Polygon',
            description: 'Lorem ipsum dolor sith amet',
            path: 'radar/color-fill-polygon'
        }
    ],
    pie: [
        {
            title: 'Simple',
            description: 'Lorem ipsum dolor sith amet',
            path: 'pie/simple'
        },
        {
            title: 'Donut',
            description: 'Lorem ipsum dolor sith amet',
            path: 'pie/donut'
        },
        {
            title: 'Pattern',
            description: 'Lorem ipsum dolor sith amet',
            path: 'pie/pattern'
        }
    ],
    heatmap: [
        {
            title: 'Heatmap',
            description: 'Lorem ipsum dolor sith amet',
            path: 'heatmap/simple'
        },
        {
            title: 'Multiple Datasets',
            description: 'Lorem ipsum dolor sith amet',
            path: 'heatmap/multiple-datasets'
        },
        {
            title: 'Color Range',
            description: 'Lorem ipsum dolor sith amet',
            path: 'heatmap/color-range'
        }
    ],
}