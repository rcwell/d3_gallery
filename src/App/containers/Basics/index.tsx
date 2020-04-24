import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from 'App/components/BreadCrumbs';

const Basics = () => {
    return (
        <>
            <Header>
                <BreadCrumbs links={["HOME", "BASICS"]} />
                <Title>Basics</Title>
            </Header>
            <BodyContent>
            </BodyContent>
        </>
    );
};

export default Basics;

const blue = `cornflowerblue`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${blue};
`;
const Title = styled.h1`
    font-weight: 600;
    font-size: 1.3rem;
`;

const BodyContent = styled.section`
    display: flex;
`;
