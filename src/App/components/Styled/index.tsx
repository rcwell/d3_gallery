import styled from 'styled-components';
import { black, grey } from 'App/components/Colors';

const ScrollableSection = styled.section`
    height: 100%;
    overflow: auto;
`;
const Body = styled.section`
    display: flex;
    flex-direction: column;
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
    color: ${black};
`;
const Description = styled.label`
    color: ${grey};
`;

export {
    ScrollableSection,
    Header,
    Title,
    Description,
    Body,
}