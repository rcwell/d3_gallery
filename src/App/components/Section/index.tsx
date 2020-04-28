import React from 'react';
import styled from 'styled-components';
import { D3 } from 'App/components/Icons';
import { SectionProps, CardProps } from 'App/interface';
import { Title, Description } from 'App/components/Styled';
import { blue, grey } from 'App/components/Colors';

const Section = ({ title, description, contents, onCardClick }: SectionProps) => {
    return (
        <SectionWrapper>
            <Title>{title}</Title>
            <Description>
                {description}
            </Description>
            <CardsWrapper>
                {contents.map((x, i) => (
                    <SectionCard
                        onClick={() => onCardClick ? onCardClick(x) : null}
                        key={i.toString()}
                        id={i.toString()}
                        title={x.title}
                        description={x.description}
                        icon={x.icon}
                        code={x.code} />
                ))}
            </CardsWrapper>
        </SectionWrapper>
    )
}
const SectionCard = ({ id, title, icon, description, code, onClick }: CardProps) => {
    return (
        <Card key={id} onClick={onClick}>
            <div>
                <div>{icon || <D3 />}</div>
                <div>{code || "--"}</div>
            </div>
            <div>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </div>
        </Card>
    )
};

const SectionWrapper = styled.section`
    margin: 10px 0;
    
    ${Title} {
        font-size: 1.3rem;
        margin-top: 0;
    }
`;

const CardsWrapper = styled.div`
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
    cursor:pointer; 
    transition:all .3s ease-in-out;

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

    :hover{
        box-shadow: -2px 10px 50px -13px rgba(0,0,0,.15);
    }
`;

export default Section;