import React from 'react';
import { H3, P, Code, CodeBlock, Anchor } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import StoryNavigation from 'App/components/StoryNavigation';
import { RouteChildrenProps } from 'react-router-dom';

export const Line = ({ location: { pathname } }: RouteChildrenProps) => {

    return (
        <>
            <Story />
            <StoryNavigation
                prevLink={{
                    displayName: "Prev: Path",
                    path: pathname.replace('/line', '/path')
                }}
                nextLink={{
                    displayName: "Next: Polygon",
                    path: pathname.replace('/line', '/polygon')
                }} />
        </>
    )
}

const Story = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000
        }}>
            <StoryBlock>
                <H3>Selecting our SVG container</H3>
                <P>In the previous section, we learned how to select and create our SVG container from and to DOM. <Anchor to={"/basics/shapes/rect"}>Click here</Anchor> to check it again</P>
                <P> Let's start out by selecting our SVG container from DOM by using <Code>d3.select</Code> :</P>
                <P>I added a styling to see our SVG container.</P>
                <Svg />
            </StoryBlock>

            <StoryBlock>
                <H3>Draw the Line</H3>
                <P>We then draw our line by appending a <Code>line</Code> element on our SVG container using <Code>svg.append</Code> :</P>
                <CodeBlock maxWidth={600}>{sourceCodes[0]}</CodeBlock>
                <Svg><line /></Svg>
                <P>At this point, we still won't be able to see our line but trust me it's there. In order for our line to be seen, we need to add our line's start and end points coordinates and also the stroke properties</P>
                <P>To do this, we use <Code>x1 & y2</Code> for start point coordiate, and <Code>x2 & y2</Code>. To add stroke properties, we use <Code>stroke</Code> for color and <Code>stroke-width</Code> for the thickess of our line</P>
                <Svg><line x1="20" y1="20" x2="180" y2="130" stroke="black" stoke-width="2" /></Svg>
                <P>There we go</P>
            </StoryBlock>

            <StoryBlock>
                <P>We just change our stroke color. And now our code would look like:</P>
                <CodeBlock maxWidth={600}>{sourceCodes[1]} </CodeBlock>
                <P>And our Line would look like this:</P>
                <Svg><line x1="20" y1="20" x2="180" y2="130" stroke="cornflowerblue" stoke-width="2" /></Svg>
            </StoryBlock>
        </div>
    )
};

const Svg = ({ children }: any) => (
    <svg width="200" height="150" style={{ background: "#f7f7f7" }}>{children}</svg>
);

const sourceCodes = [
    `const line = svg.append("line")`,

    `//Select our SVG Container
    const svg = d3.select('svg');
    
//Draw our Line
const line = svg.append("line");
    
//Style our Line
line.attr("x1", 20)
        .attr("y1", 20)
        .attr("x2", 180)
        .attr("y2", 130)
        .attr("stroke-width", 2)
        .attr("stroke-color", "cornflowerblue");`
];