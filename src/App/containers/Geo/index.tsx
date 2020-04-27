import React from 'react';
import styled from 'styled-components';
import BreadCrumbs from 'App/components/BreadCrumbs';
import { ReactComponent as XYAxes } from 'App/components/Icons/xYAxes.svg';

interface SectionProps {
    title: string;
    description: string;
    contents: Array<CardProps>;
}

interface CardProps {
    title: string;
    description: string;
    icon?: JSX.Element;
    id?: string;
    code?: string;
}

const GeoMaps = [
    {
        title: 'Basic World Map',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Chrolopleth',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Bubble Map',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Pattern Fill',
        description: 'Lorem ipsum dolor sith amet'
    }
];

const Geo = () => {
    return (
        <>
            <BreadCrumbs links={["HOME", "GEO"]} />
            <ScrollContent>
                <Header>
                    <Title>Geo</Title>
                    <Description>
                        Lorem ipsum dolor sith amet
                </Description>
                </Header>
                <BodyContent>
                    <Section
                        title={""}
                        description={""}
                        contents={GeoMaps} />
                </BodyContent>
            </ScrollContent>
        </>
    );
};

export default Geo;

const black = `#5a5a5a`;
const grey = `#aeaeae`;
const blue = `cornflowerblue`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: flext-start;
    justify-content: center;
    margin:50px 0;
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
const BodyContent = styled.section`
    display: flex;
    flex-direction: column;
`;
const SectionWrapper = styled.section`
    margin: 10px 0;
    ${Title} {
        font-size: 1.3rem;
        margin-top: 0;
    }
`;
const Cards = styled.div`
    margin-top:20px;
    display:grid;
    gap:20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr) );

`;
const Card = styled.div`
    height:200px;
    border:1px solid #eee;
    border-radius:3px;
    display: grid;
    grid-template-rows: 50px 1fr;

    > div:first-child{
        border-bottom:1px solid #eee;
        position:relative;
        div: first-child{
            height:50px;
            width:50px;
            border-radius:50%;
            background:#f5f5f5;
            position:absolute;
            top:50%;
            left:20px;
            svg{
                fill:${blue};
                stroke:${blue};
                stroke-width:0;
                width:40px;
                height:40px;
                margin:-5px;
            }
        }
        div: last-child{
            top: 50%;
            position: absolute;
            right: 20px;
            transform: translateY(-50%);
            font-size: 12px;
            font-weight: 700;
            color:${grey};
        }
    }

    > div:last-child{
        padding:25px 20px 0;
    }

    ${Title}{
        font-size: 1rem;
        margin: .25em 0;
    }
`;
const ScrollContent = styled.section`
    height: 100%;
    overflow: auto;
`;

const Section = ({ title, description, contents }: SectionProps) => {
    return (
        <SectionWrapper>
            <Title>{title}</Title>
            <Description>
                {description}
            </Description>
            <Cards>
                {contents.map((x, i) => (
                    <ShapeCard
                        id={i.toString()}
                        title={x.title}
                        description={x.description}
                        icon={x.icon}
                        code={x.code} />
                ))}
            </Cards>
        </SectionWrapper>
    )
}

const ShapeCard = (content: CardProps) => {
    const { id, title, icon, description, code } = content;
    return (
        <Card key={id}>
            <div>
                <div>{icon || <XYAxes />}</div>
                <div>{code || "--"}</div>
            </div>
            <div>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </div>
        </Card>
    )
}