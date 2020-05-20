
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { H3, P, Code, CodeBlock } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import StoryNavigation from 'App/components/StoryNavigation';

export const Rect = ({ location: { pathname } }: any) => {

    return (
        <RouteWrapper
            title={"Rect"}
            description={'In this section, we will go over the <rect> shape and how to create it using D3.js.'}>
            <Story />
            <StoryNavigation
                prevLink={{
                    displayName: "Return to Basics",
                    path: pathname.replace('/shapes/rect', '')
                }}
                nextLink={{
                    displayName: "Next: Circle",
                    path: pathname.replace('rect', 'circle')
                }} />
        </RouteWrapper>
    )
}

const Story = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 800
        }}>
            <StoryBlock>
                <H3>Setting up SVG container</H3>
                <P> Let's start out by selecting our SVG container from DOM by using <Code>d3.select</Code></P>
                <CodeBlock maxWidth={600}>{sourceCodes[0]}</CodeBlock>
                <P>Assuming our SVG container already exist in DOM else create our container with <Code>d3.append</Code></P>
                <CodeBlock maxWidth={600}>{sourceCodes[1]}</CodeBlock>
                <P>I added a styling to see our SVG container.</P>
                <Svg />
            </StoryBlock>

            <StoryBlock>
                <H3>Draw the Rectangle</H3>
                <P>We then draw our rectangle by appending a <Code>rect</Code> element on our SVG container using <Code>svg.append</Code></P>
                <CodeBlock maxWidth={600}>{sourceCodes[2]}</CodeBlock>
                <Svg><rect /></Svg>
                <P>At this point, we still won't be able to see our rectangle but trust me it's there. In order for our rectangle to be seen, we need to style it. So let's add width & height to our rectangle.</P>
                <Svg><rect width="180" height="100" /></Svg>
                <P>Using the Rectangle with created, we can change its color, size, and position with <Code>fill</Code>,<Code>height & width</Code>, and <Code>x & y</Code>. </P>
                <CodeBlock maxWidth={600}>{sourceCodes[3]}</CodeBlock>
            </StoryBlock>

            <StoryBlock>
                <P>Now our code would look like this</P>
                <CodeBlock maxWidth={600}>{sourceCodes[4]} </CodeBlock>
                <P>And our Rectangle would look like this</P>
                <Svg><rect width="180" height="100" fill="cornflowerblue" x="10" y="25" /></Svg>
            </StoryBlock>
        </div>
    )
};

const Svg = ({ children }: any) => (
    <svg width="200" height="150" style={{ background: "#f7f7f7" }}>{children}</svg>
);

const sourceCodes = [
    `const svg = d3.select('svg');`,
    `const parentEl = d3.select('body');
const svg = parentEl.append('svg')
    .attr("width", 200)
    .attr("height", 150);`,
    `const rectangle = svg.append("rect")`,

    `rectangle.attr("fill", "cornflowerblue")
    .attr("height", 100)
    .attr("width", 180)
    .attr("x", 10)
    .attr("y", 25);`,
    `//Create our SVG Container
    const parentEl = d3.select('body');
    const svg = parentEl.append('svg')
        .attr("width", 200)
        .attr("height", 150);
    
//Draw our Rectangle
const rectangle = svg.append("rect");
    
//Style our Rectangle
rectangle.attr("fill", "cornflowerblue")
        .attr("height", 100)
        .attr("width", 180)
        .attr("x", 10)
        .attr("y", 25);`
];