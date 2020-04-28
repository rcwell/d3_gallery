import React from 'react';
import styled from 'styled-components';
import { AiFillHome } from 'react-icons/ai';
import { GoChevronRight } from 'react-icons/go';
import { Link } from "react-router-dom";
import { black, grey, blue } from 'App/components/Colors';

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
};

const CrumbsContainer = styled.section`
color: ${blue};
height:50px;
display: flex;
align-items: center;
position:absolute;
top: -5px;
left: 20px;
right: 8px;
z-index: 1;
background:linear-gradient(180deg,#f7f7f7 50%,transparent);

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


export default BreadCrumbs; 