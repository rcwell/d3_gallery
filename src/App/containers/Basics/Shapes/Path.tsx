
import React from 'react';
import { H3, P, Code, CodeBlock, Anchor } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import StoryNavigation from 'App/components/StoryNavigation';
import { RouteChildrenProps } from 'react-router-dom';

export const Path = ({ location: { pathname } }: RouteChildrenProps) => {
    
    return (
        <>
            <Story />
            <StoryNavigation
                prevLink={{
                    displayName: "Prev: Circle",
                    path: pathname.replace('/path', '/path')
                }}
                nextLink={{
                    displayName: "Next: Line",
                    path: pathname.replace('/path', '/line')
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
                <H3>Draw the Path</H3>
                <P>We then draw our path by appending a <Code>path</Code> element on our SVG container using <Code>svg.append</Code> :</P>
                <CodeBlock maxWidth={600}>{sourceCodes[0]}</CodeBlock>
                <Svg><path /></Svg>
                <P>At this point, we still won't be able to see our path but trust me it's there. In order for our path to be seen, we need to style it. So let's add size to our path.</P>


                <P>Just like <Code>line</Code>, to create visible <Code>path</Code>, We define it's 'd' attribute using the following commands:</P>
                <ul>
                    <li>M = moveto</li>
                    <li>L = lineto</li>
                    <li>H = horizontal lineto</li>
                    <li>V = vertical lineto</li>
                    <li>C = curveto</li>
                    <li>S = smooth curveto</li>
                    <li>Q = quadratic Bézier curve</li>
                    <li>T = smooth quadratic Bézier curveto</li>
                    <li>A = elliptical Arc</li>
                    <li>Z = closepath</li>
                </ul>

                <P>To Begin, we want the path to start at 5,0 (x,y) and move to 5,72 to create a vertical line, so we say <Code>M 5 0 5 72</Code></P>

                <Svg><path stroke="red" fill="none" d="M 5 0 5 72 " /></Svg>
                <P>Keep adding properties to the attribute and add a little stroke color. And now our code would look like:</P>
                <CodeBlock maxWidth={600}>{sourceCodes[1]}</CodeBlock>
                <P>and our path will look like this</P>
                <Svg><path stroke="red" fill="none" d="M 5 0 5 72 A 1 1 0 0 0 50 72 " /></Svg>
            </StoryBlock>

            <StoryBlock>
                <H3>Create Path using D3's line() function</H3>
                <P>D3 has a generator that generates path from data you give.</P>
                <CodeBlock maxWidth={600}>{sourceCodes[2]} </CodeBlock>
                <Svg>
                    <path
                        d="M1,5L20,20L40,10L60,40L80,5L100,60"
                        stroke="#6495ed"
                        strokeWidth="2"
                        fill="none"
                    />
                </Svg>
            </StoryBlock>
        </div>
    )
};

const Svg = ({ children }: any) => (
    <svg width="200" height="150" style={{ background: "#f7f7f7" }}>{children}</svg>
);

const sourceCodes = [
    `const path = svg.append("path")`,

    `d="M 5 0 5 72 A 1 1 0 0 0 50 72"`,

    `//Select our SVG Container
const svg = d3.select('svg');
    
//Data for our path
const pathData: any = [{ "x": 1, "y": 5 }, { "x": 20, "y": 20 },
    { "x": 40, "y": 10 }, { "x": 60, "y": 40 },
    { "x": 80, "y": 5 }, { "x": 100, "y": 60 }];
    
//Our Generator
const pathGenerator = d3.line()
    .x((d: any) => d.x)
    .y((d: any) => d.y);
    
//The line SVG Path we draw
const lineGraph = svg.append("path")
    .attr("d", pathGenerator(pathData) || "")
    .attr("stroke", "#6495ed")
    .attr("stroke-width", 2)
    .attr("fill", "none");`
];

