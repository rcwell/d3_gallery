import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { black, gray, blue } from 'App/components/Colors';
import { BreadcrumbProps } from 'App/interface';
import { GoChevronRight, AiFillHome } from 'App/components/Icons';

const BreadCrumbs = ({ links }: BreadcrumbProps) => (
    <CrumbsContainer>
        <div key={"/"}>
            <AiFillHome style={{ marginRight: 10 }} />
            <Link to={"/"}>HOME</Link>
        </div>
        {links.map(({ path, displayName }) => (
            <div key={path}>
                <GoChevronRight size={20} strokeWidth={0.5} style={{ margin: "0 10px" }} stroke={black} fill={black} />
                <Link key={path} to={path}>{displayName.toUpperCase()}</Link>
            </div>
        ))}
    </CrumbsContainer>
);

const CrumbsContainer = styled.section`
    color: ${blue};
    height:50px;
    display: flex;
    align-items: center;
    position:absolute;
    top: 0;
    left: 20px;
    right: 13px;
    z-index: 1;
    background:linear-gradient(180deg,#f7f7f7 50%,transparent);
    flex-direction: row;

    > div{
        display: flex;
        align-items: center;
        justify-content: center;
        
        & :last-child a{
            color:${gray};
            pointer-events:none;
        }

        > a{
            text-decoration:none;
            color:${black};
            font-weight:700;
            font-size:14px;
        }
    }
`;


export default BreadCrumbs; 