import React from 'react';
import styled from 'styled-components';
import {
    AiFillHome
} from 'react-icons/ai';

import {
    GoChevronRight
} from 'react-icons/go';

import {
    Link
} from "react-router-dom";


const BreadCrumbs = ({ links }: any) => {
    return (
        <CrumbsContainer>
            {
                links.map((link: string, i: number) => {
                    return (
                        <div key={link}>
                            {i === 0
                                ? <AiFillHome style={{ marginRight: 10 }} />
                                : <GoChevronRight size={20} strokeWidth={0.5} style={{ margin: "0 10px" }} stroke={black} fill={black} />}
                            <Link key={link} to="/">{link}</Link>
                        </div>
                    )
                })
            }
        </CrumbsContainer>
    );
}

export default BreadCrumbs;

const black = `#5a5a5a`;
const grey = `#aeaeae`;

const CrumbsContainer = styled.div`
    width:100%;
    height:50px;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position:relative;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div a{
        text-decoration:none;
        color:${black};
        font-weight:700;
        font-size:14px;
    }
    div:last-child a{
        color:${grey};
        pointer-events:none;
    }
`;