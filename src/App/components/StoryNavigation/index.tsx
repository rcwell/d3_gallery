import React from 'react';
import styled from 'styled-components';
import { Anchor } from 'App/components/Typography';


interface StoryNavigationProps {
    prevLink?: StoryLink
    nextLink?: StoryLink
}

interface StoryLink {
    displayName: string;
    path: string;
}

const StoryNavigation = ({ prevLink, nextLink }: StoryNavigationProps) => {
    return (
        <Well>
            {prevLink && <Anchor to={prevLink.path}>{prevLink.displayName}</Anchor>}
            {nextLink && <Anchor to={nextLink.path}>{nextLink.displayName}</Anchor>}
        </Well>
    )
}

const Well = styled.section`
    padding: .5rem 0;
    margin-bottom: .35rem;
    display: flex;
    justify-content: space-between;
`;

export default StoryNavigation;