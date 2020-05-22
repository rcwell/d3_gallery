import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import { getLastOfArray, capitalizeString } from 'App/utils';
import Line from './Line';
import Area from './Area';
import Bar from './Bar';
import Scatter from './Scatter';
import Pie from './Pie';
import Radar from './Radar';
import Heatmap from './Heatmap';

const Routes = () => {
    const { location } = useHistory();
    const { url } = useRouteMatch();

    const [page, setPage] = React.useState({
        title: "Charts",
        description: "Lorem ipsum dolor sith amet"
    });

    React.useEffect(() => {
        setPage({
            description: "Lorem ipsum dolor sith amet",
            title: getLastOfArray(location.pathname.split('/')).split('-').map(capitalizeString).join(" ")
        });
    }, [location.pathname])

    return (
        <RouteWrapper
            title={page.title}
            description={page.description}>
            <Switch>
                <Route path={url + '/line'} component={Line} />
                <Route path={url + '/area'} component={Area} />
                <Route path={url + '/bar'} component={Bar} />
                <Route path={url + '/scatter'} component={Scatter} />
                <Route path={url + '/pie'} component={Pie} />
                <Route path={url + '/radar'} component={Radar} />
                <Route path={url + '/heatmap'} component={Heatmap} />
            </Switch>
        </RouteWrapper>
    )
}

export default Routes;