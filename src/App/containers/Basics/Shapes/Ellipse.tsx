import React from 'react';
import { H3, P, Code, CodeBlock, Anchor } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import StoryNavigation from 'App/components/StoryNavigation';
import { RouteChildrenProps } from 'react-router-dom';

export const Ellipse = ({ location: { pathname } }: RouteChildrenProps) => {

    return (
        <>
            <Story />
            <StoryNavigation
                prevLink={{
                    displayName: "Prev: Circle",
                    path: pathname.replace('/ellipse', '/circle')
                }}
                nextLink={{
                    displayName: "Next: Path",
                    path: pathname.replace('/ellipse', '/path')
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
                <H3>Draw the Ellipse</H3>
                <P>We then draw our ellipse by appending a <Code>ellipse</Code> element on our SVG container using <Code>svg.append</Code> :</P>
                <CodeBlock maxWidth={600}>{sourceCodes[0]}</CodeBlock>
                <Svg><ellipse /></Svg>
                <P>At this point, we still won't be able to see our ellipse but trust me it's there. In order for our ellipse to be seen, we need to style it. So let's add size to our ellipse.</P>
                <P>Just like <Code>circle</Code>, to size the <Code>ellipse</Code>, We defined it's 'Radius' but we can't use the attribute <Code>r</Code> like the <Code>circle</Code>. Wee need to defined the radius-x and radius-y with <Code>rx & ry</Code></P>
                <Svg><ellipse rx="100" ry="50" /></Svg>
                <P>Looking at our ellipse, we only see quarter of it. Because by default, elements without coordinates are located at 0,0[x & y] on the plane and our ellipse is anchored its center to it.</P>
                <P>We can however define it's coordinates by using <Code>cx</Code> and <Code>cy</Code>.</P>
                <CodeBlock maxWidth={600}>{sourceCodes[1]}</CodeBlock>
                <P>Now our ellipse will look like this</P>
                <Svg><ellipse rx="100" ry="50" cx="100" cy="75" /></Svg>
            </StoryBlock>

            <StoryBlock>
                <P>We just add a little fill color. And now our code would look like:</P>
                <CodeBlock maxWidth={600}>{sourceCodes[2]} </CodeBlock>
                <P>And our Ellipse would look like this:</P>
                <Svg><ellipse rx="100" ry="50" cx="100" cy="75" fill="cornflowerblue" /></Svg>
            </StoryBlock>
        </div>
    )
};

const Svg = ({ children }: any) => (
    <svg width="200" height="150" style={{ background: "#f7f7f7" }}>{children}</svg>
);

const sourceCodes = [
    `const ellipse = svg.append("ellipse")`,

    `ellipse.attr("cx", 10).attr("cy", 25);`,

    `//Select our SVG Container
    const svg = d3.select('svg');
    
//Draw our Ellipse
const ellipse = svg.append("ellipse");
    
//Style our Ellipse
ellipse.attr("rx", 100)
        .attr("rx", 50)
        .attr("cx", 100)
        .attr("cy", 75)
        .attr("fill", "cornflowerblue");`
];