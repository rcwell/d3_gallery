import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import { getLastOfArray, capitalizeString } from 'App/utils';
import Shapes from '../Shapes';
import Axis from '../Axis';
import Scales from '../Scales';
import Plotting from '../Plotting';

const Routes = () => {
    const { location } = useHistory();
    const { url } = useRouteMatch();

    const [page, setPage] = React.useState({
        title: "Basics",
        description: "Lorem ipsum dolor sith amet"
    });

    React.useEffect(() => {
        setPage({
            description: "Lorem ipsum dolor sith amet",
            title: capitalizeString(getLastOfArray(location.pathname.split('/')))
        });
    }, [location.pathname])

    return (
        <RouteWrapper
            title={page.title}
            description={page.description}>
            <Switch>
                <Route path={url + '/plotting'} component={Plotting} />
                <Route path={url + '/scales'} component={Scales} />
                <Route path={url + '/axis'} component={Axis} />
                <Route path={url + '/shapes'} component={Shapes} />
            </Switch>
        </RouteWrapper>
    )
}

export default Routes;