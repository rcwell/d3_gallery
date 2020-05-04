import styled from 'styled-components';
import { black } from 'App/components/Colors';

const ScrollableSection = styled.section`
    height: 100%;
    overflow: auto;
    color: ${black};

`;
const Body = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow:1;
`;
const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: flext-start;
    justify-content: center;
    padding:50px 0;
`;
const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: .25em;
`;
const StoryBlock = styled.section`
    margin:1rem 0;
    display: flex;
    flex-direction: column;

    > svg{
        margin-left:1rem;
    }
`;

const Description = styled.label``;

export {
    ScrollableSection,
    Header,
    Title,
    Description,
    Body,
    StoryBlock
}