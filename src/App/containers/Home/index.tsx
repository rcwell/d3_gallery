import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { blue, lightBlue } from 'App/components/Colors';
import { D3, FaGlobeAmericas, FaMagic, TiChartArea } from 'App/components/Icons';

const Home = () => (
    <CategoryCardContainer>
        {links.map(link => (
            <Link key={link.to} to={link.to}>
                {<link.icon />}
                <div>{link.displayName}</div>
            </Link>
        ))}
    </CategoryCardContainer >
)

const links = [
    {
        to: '/basics',
        displayName: 'Basics',
        icon: D3
    },
    {
        to: '/charts',
        displayName: 'Charts',
        icon: TiChartArea
    },
    {
        to: '/geo',
        displayName: 'Geo',
        icon: FaGlobeAmericas
    },
    {
        to: '/custom',
        displayName: 'Custom',
        icon: FaMagic
    }
];

const CategoryCardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;
    height:100%;
    width:100%;
    padding:20px;

    > a{
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

        svg{
            height:50px;
            width:50px;
        }
        div{
            position: absolute;
            bottom: 20px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 15px;
        }
    }
`;

export default Home;