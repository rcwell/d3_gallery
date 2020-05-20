import React from 'react';
import styled from 'styled-components';
import { darkGray, lightGray, blue } from 'App/components/Colors';
import { Link, LinkProps } from 'react-router-dom';

type FontSizesType = "xs" | "s" | "m" | "l" | "xl";
enum FontSizesEnum {
    "xs" = .6,
    "s" = .8,
    "m" = 1,
    "l" = 1.2,
    "xl" = 1.4
}
interface TypographyProps {
    size?: FontSizesType;
}

export const H1 = styled.h1`
    margin-top: 0;
    font-size: 1.8rem;
    margin-bottom: 0.35em;
`;
export const H2 = styled.h2`
    margin-top: 0;
    font-size: 1.6rem;
    margin-bottom: 0.35em;
`;
export const H3 = styled.h3`
    margin-top: 0;
    font-size: 1.4rem;
    margin-bottom: 0.35em;
`;
export const H4 = styled.h4`
    margin-top: 0;
    font-size: 1.2rem;
    margin-bottom: 0.35em;
`;
export const H5 = styled.h4`
    margin-top: 0;
    font-size: 1rem;
    margin-bottom: 0.35em;
`;
export const Caption = styled.span<TypographyProps>`
    margin-top: 0;
    font-size:  ${({ size }: TypographyProps) => FontSizesEnum[size || "m"]}rem;
    margin-bottom: 0.35em;
`;
export const P= styled.p<TypographyProps>`
    margin-top: 0;
    font-size:  ${({ size }: TypographyProps) => FontSizesEnum[size || "m"]}rem;
    margin: 1em 0;
`;

const AnchorWrap = styled.label<TypographyProps>`
    display: unset;
    font-size: .9rem;
    padding: .05rem 0;
    a{
        text-decoration:none;
        color:${blue};
    }
`;
export const Anchor = ({ to, children }: LinkProps) => (
    <AnchorWrap>
        <Link to={to}>{children}</Link>
    </AnchorWrap>
)

export const Code = styled.code`
    font-size: .9rem;
    background: ${lightGray};
    padding: .2rem .4rem;
    border-radius: .25rem;
    color: #bd4147;
`;
export const Pre = styled.pre`
    padding: .5rem;
    border-radius: .25rem;
    background: ${lightGray};
    color: ${darkGray};
    margin: 1rem 0;
    overflow:auto;

    ${Code}{
        display: block;
        font-size: inherit;
        background: transparent;
        padding: 0;
        border-radius: 0;
        color: inherit;
    }
`;

export const CodeBlock = ({ children, maxWidth, maxHeight }: any) => (
    <Pre style={{ maxWidth, maxHeight, marginLeft: '1rem' }}>
        <Code>{children}</Code>
    </Pre>
);
