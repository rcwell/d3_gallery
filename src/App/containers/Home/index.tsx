import React from 'react';
import { TiChartArea } from 'react-icons/ti';
import { FaGlobeAmericas, FaMagic } from 'react-icons/fa';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { D3 } from 'App/components/Icons';
import { blue, lightBlue } from 'App/components/Colors';

const Home = () => {
    return (
        <CategoryCardContainer>
            <LinkCard to="/basics">
                {<D3 />}
                <div>Basics</div>
            </LinkCard>
            <LinkCard to="/charts">
                {<TiChartArea />}
                <div>Charts</div>
            </LinkCard>
            <LinkCard to="/geo">
                {<FaGlobeAmericas />}
                <div>Geo</div>
            </LinkCard>
            <LinkCard to="/customvisualizations">
                {<FaMagic />}
                <div>Custom Visualizations</div>
            </LinkCard>
        </CategoryCardContainer >
    );
};

export default Home;

const LinkCard = ({ children, ...p }: LinkProps) => {
    return (
        <CategoryCard>
            <Link {...p}>{children}</Link>
        </CategoryCard>
    );
}
const CategoryCard = styled.div`
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
const CategoryCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
    height:100%;
    width:100%;
    padding:20px;
`;