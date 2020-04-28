import React from 'react';
import styled from 'styled-components';
import Home from 'App/containers/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import Basics from 'App/containers/Basics';
import Charts from 'App/containers/Charts';
import Geo from 'App/containers/Geo';
import CustomVisualizations from 'App/containers/CustomVisualizations';
import { black, blue, lightBlue, red, orange, green } from 'App/components/Colors';
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import transitionHOC from 'App/components/transitionHOC';

const App = () => {
    const [isExpanded, setExpanded] = React.useState(Boolean);
    const [currentLocation, setLocation] = React.useState(String);

    React.useEffect(() => {
        const baseUrl = "http://localhost:3000";
        const curLocation = window.location.href.replace(baseUrl, '');
        setLocation(curLocation);
        setExpanded(curLocation !== '/');
    }, []);

    const handleOnRouteChange = (location: string) => {
        if (currentLocation === location) return;
        setExpanded(location !== '/');
        setLocation(location);
    };

    return (
        <AppWrapper>
            <Header theme={{ expanded: isExpanded }}>
                <Title>D3 Component Gallery</Title>
                <Description>
                    A gallery showcasing components built with D3 and React+Typescript from basics usage up.
                </Description>
                <IconLink href={"https://github.com/rcwell/d3_gallery"} target={"_blank"}>
                    <AiFillGithub />
                </IconLink>
            </Header>
            <ViewPort theme={{ expanded: isExpanded }}>
                <ViewTopBar>
                    <div></div>
                    <div></div>
                    <div onClick={() => setExpanded(!isExpanded)}>
                        {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
                    </div>
                </ViewTopBar>
                <ViewportBody>
                    <Router>
                        <Routes onRouteChange={handleOnRouteChange} />
                    </Router>
                </ViewportBody>
            </ViewPort>
        </AppWrapper>
    );
};

export default App;

const Routes = withRouter(({ location, onRouteChange }: any) => {
    const { pathname } = location;

    React.useEffect(() => {
        onRouteChange(pathname);
    }, [pathname, onRouteChange]);

    return transitionHOC(pathname)(
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
    )
});

const AppWrapper = styled.section`
    justify-content: center;
    background: #ffffff;
    display: flex;
    padding: 20px;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    position:relative;
`;
const ViewTopBar = styled.div`
    height: 30px;
    width: 100%;
    background: #fff;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    display: grid;
    grid-template-columns: 15px 15px 15px auto;
    align-items: center;
    
    :hover div{
        height:13px;
        width:13px;
        svg{
            opacity: 1;
        }
    }
        
    div{
        height:10px;
        width:10px;
        border-radius:50%;
        position: relative;
        transition: all .3s ease-in-out;
    }
    div:nth-child(1){
        background:${red};
    }
    div:nth-child(2){
        background:${orange};
    }
    div:nth-child(3){
        background:${green};
        cursor:pointer;

        :hover{
            height:15px;
            width:15px;
        }
    }
    div svg{
        opacity: 0;
        fill:#fff;
        height: calc(100% - 4px);
        width: calc(100% - 4px);
        top:2px;
        left:2px;
        position: absolute;
        transition: all .3s ease-in-out;
    }
`;
const ViewPort = styled.div`
    z-index: 1;
    box-shadow: -2px 10px 50px -13px rgba(0,0,0,.15);
    border: 1px solid #eee;
    background: linear-gradient(180deg,#f7f7f7 0,#fff 19%,#fff);
    display: flex;
    flex-direction: column;
    height:100%;
    width:100%;
    max-height: ${props => props.theme.expanded ? "100%" : "500px"};
    max-width: ${props => props.theme.expanded ? "100%" : "700px"};
    margin: 0 auto;
    transform: ${props => props.theme.expanded ? "" : "translateY(25%)"};
    transition: all .5s ease-in-out;
`;
ViewPort.defaultProps = {
    theme: {
        expanded: false
    }
};
const Header = styled.header`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50vh;
    flex-direction: column;
    background: ${lightBlue};
    align-items: center;
    justify-content:center;
    color: ${blue};
    opacity: ${props => props.theme.expanded ? 0 : 1};
    transition: opacity .3s ease-in-out;
`;
Header.defaultProps = {
    theme: {
        expanded: false
    }
};
const IconLink = styled.a`
    font-weight: 600;
    font-size: 1.3rem;
    color: ${black};
    font-size: 2.5rem;

    :hover {
        color: ${blue};
    }
`;
const Title = styled.h1`
    font-weight: 600;
    font-size: 1.3rem;
`;
const Description = styled.h2`
    font-size: 1.1rem;
    font-weight: 400;
    max-width: 400px;
    text-align: center;
`;
const ViewportBody = styled.section`
    height:100%;
    width:100%;
`;
