import React from 'react';
import styled from 'styled-components';

import { ReactComponent as D3 } from 'App/components/Icons/d3.svg';
import { TiChartArea } from 'react-icons/ti';
import { FaGlobeAmericas, FaMagic } from 'react-icons/fa';
import {
    LinkProps,
    Link
} from "react-router-dom";

const Home = () => {
    return (
        <CardContainer>
            <LinkCard to="/basics">
                {<D3 />}
                <div>Basics</div>
            </LinkCard>
            <LinkCard to="/charts">
                {<TiChartArea />}
                <div>Charts</div>
            </LinkCard>
            <LinkCard to="/maps">
                {<FaGlobeAmericas />}
                <div>Maps</div>
            </LinkCard>
            <LinkCard to="/customvisualizations">
                {<FaMagic />}
                <div>Custom Visualizations</div>
            </LinkCard>
        </CardContainer >
    );
};

export default Home;

const LinkCard = (p: LinkProps) => {
    return (
        <Card>
            <Link {...p}>{p.children}</Link>
        </Card>
    );
}

const blue = `cornflowerblue`;
const lightBlue = `aliceblue`;

const Card = styled.div`
    a{
        background:${lightBlue};
        border:1px solid ${blue};
        width: 100%;
        height:100%;
        text-align:center;
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: 2px;
        padding:10px;
        color: cornflowerblue;
        text-decoration: none;
        position:relative;

        :hover{    
            box-shadow: 0 6px 11px -7px #4063a2;
        }
    }

    a svg{
        height:50px;
        width:50px;
    }

    a div{
        position: absolute;
        bottom: 20px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 15px;
    }
`;
const CardContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
    height:100%;
    width:100%;
    padding:20px;
`;