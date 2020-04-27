import React from 'react';
import { D3 } from 'App/components/Icons';
import { AiFillHome } from 'react-icons/ai';
import { GoChevronRight } from 'react-icons/go';
import { SectionProps, CardProps } from 'App/interface';
import { LinkProps, Link } from "react-router-dom";
import { black } from 'App/components/Colors';
import {
    CrumbsContainer,
    SectionWrapper,
    Title,
    Description,
    Cards,
    Card,
    CategoryCard
} from 'App/components/Styled';

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

const ShapeCard = ({ id, title, icon, description, code }: CardProps) => {
    return (
        <Card key={id}>
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

const LinkCard = ({ children, ...p }: LinkProps) => {
    return (
        <CategoryCard>
            <Link {...p}>{children}</Link>
        </CategoryCard>
    );
}

export { Section, Title, Description, BreadCrumbs, LinkCard };