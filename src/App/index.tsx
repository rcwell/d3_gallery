import React from 'react';
import styled from 'styled-components';
import { black, blue, lightBlue, red, orange, green } from 'App/components/Colors';
import { FaExpandAlt, FaCompressAlt, AiFillGithub } from 'App/components/Icons';
import { Title, Description } from 'App/components/Styled';
import Containers from 'App/containers';

const baseUrl = "http://localhost:3000";

const App = () => {
    const [isExpanded, setExpanded] = React.useState(Boolean);
    const [currentLocation, setLocation] = React.useState(String);

    const handleOnRouteChange = React.useCallback((location: string) => {
        if (currentLocation === location) return;
        setExpanded(location !== '/');
        setLocation(location);
    }, [currentLocation]);

    React.useEffect(() => {
        const currentUrl = window.location.href.replace(baseUrl, '');
        handleOnRouteChange(currentUrl)
    }, [handleOnRouteChange]);

    return (
        <AppWrapper isExpanded={isExpanded}>
            <header>
                <Title>D3 Component Gallery</Title>
                <Description>
                    A gallery showcasing components built with D3 and React+Typescript from basics usage up.
                </Description>
                <a href={"https://github.com/rcwell/d3_gallery"} target={"_blank"} rel="noopener noreferrer">
                    <AiFillGithub />
                </a>
            </header>
            <section>
                <section>
                    <div></div>
                    <div></div>
                    <div onClick={() => setExpanded(!isExpanded)}>
                        {isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
                    </div>
                </section>
                <Containers onRouteChange={handleOnRouteChange} />
            </section>
        </AppWrapper>
    );
};


const AppWrapper = styled.section<{ isExpanded: boolean }>`
    justify-content: center;
    background: #ffffff;
    display: flex;
    padding: 20px;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    position:relative;

    > header {
        display: flex;
        pointer-events: ${({ isExpanded }) => isExpanded ? "none" : "all"};
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 50vh;
        flex-direction: column;
        background: ${lightBlue};
        align-items: center;
        justify-content:center;
        opacity: ${({ isExpanded }) => isExpanded ? 0 : 1};
        color: ${blue};
        text-align: center;
        transition: opacity .3s ease-in-out;

        > *:not(a){
            max-width: 400px;
            margin-bottom: .8em;
        }

        > a {
            font-weight: 600;
            color: ${black};
            font-size: 2.5rem;
            &:hover {
                color: ${blue};
            }
        }
    }

    > section {
        z-index: 1;
        box-shadow: -2px 10px 50px -13px rgba(0,0,0,.15);
        border: 1px solid #eee;
        background: linear-gradient(180deg,#f7f7f7 0,#fff 19%,#fff);
        display: flex;
        flex-direction: column;
        height:100%;
        width:100%;
        max-height: ${({ isExpanded }) => isExpanded ? "100%" : "500px"};
        max-width: ${({ isExpanded }) => isExpanded ? "100%" : "700px"};
        margin: 0 auto;
        transform: ${({ isExpanded }) => isExpanded ? "" : "translateY(25%)"};
        transition: all .5s ease-in-out;
        > section{
            width: 100%;

            &:first-child{
                height: 30px;
                background: #fff;
                padding: 0 10px;
                border-bottom: 1px solid #eee;
                display: grid;
                grid-template-columns: 15px 15px 15px auto;
                align-items: center;
                &:hover div{
                    height:13px;
                    width:13px;
                    svg{
                        opacity: 1;
                    }
                }
                > div{
                    height:10px;
                    width:10px;
                    border-radius:50%;
                    position: relative;
                    transition: all .3s ease-in-out;
                }
                > div:nth-child(1){
                    background:${red};
                }
                > div:nth-child(2){
                    background:${orange};
                }
                > div:nth-child(3){
                    background:${green};
                    cursor:pointer;
    
                    :hover{
                        height:15px;
                        width:15px;
                    }
                }
                > div > svg{
                    opacity: 0;
                    fill:#fff;
                    height: calc(100% - 4px);
                    width: calc(100% - 4px);
                    top:2px;
                    left:2px;
                    position: absolute;
                    transition: all .3s ease-in-out;
                }
            }
            &:last-child{
                height:100%;
                position:relative;
            }
        }
    }
`;

export default App;