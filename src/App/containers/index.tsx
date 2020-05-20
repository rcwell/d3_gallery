import React from 'react';
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import transitionHOC, { TransitionTypes } from 'App/components/transitionHOC';
import BreadCrumbs from 'App/components/Breadcrumbs';
import styled from 'styled-components';

interface IContainers {
    onRouteChange: (path: string) => void;
}

const lazyLoader = (module: string, delay: number = 500) => {
    return React.lazy(() => new Promise<any>(resolve =>
        setTimeout(() => resolve(import(`${module}`)), delay)
    ));
}

const Home = lazyLoader('./Home',0);
const Basics = lazyLoader('./Basics');
const Charts = lazyLoader('./Charts');
const Geo = lazyLoader('./Geo');
const CustomVisualizations = lazyLoader('./CustomVisualizations');

const Containers = (props: IContainers) => {
    return (
        <section>
            <BrowserRouter>
                <Routes onRouteChange={props.onRouteChange} />
            </BrowserRouter>
        </section>
    )
}

const Routes = withRouter(({ location, onRouteChange }: any) => {
    const { pathname } = location;
    const paths: Array<string> = pathname.split('/').filter((x: string) => x);
    const path = paths[0] || "Home";

    React.useEffect(() => {
        if (paths.length > 2) return;
        onRouteChange(pathname);
    }, [pathname, onRouteChange, paths]);

    const renderBreadCrumbs = () => {
        if (paths.length === 0) return null;
        const error404 = document.getElementById('404-page-not-found');
        const links = error404 ? [] : paths.reduce((acc: any, cur: string) => ({
            _p: [...acc._p, cur],
            final: [...acc.final, { displayName: cur, path: `/${[...acc._p, cur].join("/")}` }]
        }), { _p: [], final: [] }).final;

        return <BreadCrumbs links={links} />
    }

    return transitionHOC(
        path,
        TransitionTypes.Fade)(
            <React.Suspense fallback={<Loader>Loading...</Loader>}>
                {renderBreadCrumbs()}
                <Switch location={location}>
                    <Route path="/basics">
                        <Basics />
                    </Route>
                    <Route path="/charts">
                        <Charts />
                    </Route>
                    <Route path="/geo">
                        <Geo />
                    </Route>
                    <Route path="/customvisualizations">
                        <CustomVisualizations />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                </Switch>
            </React.Suspense>
        )
});
const Loader = styled.div`
    position: absolute;
    top: 5px;
    display: flex;
    left: 5px;
    right: 5px;
    bottom: 5px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 2rem;
    color: #d7d7d7;
`;
export default Containers;