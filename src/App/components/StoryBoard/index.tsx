import React from 'react';
import ResizableBiPanel from 'App/components/ResizableBiPanel';
import { H3, P, Code, CodeBlock, Anchor } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';

const StoryBoard = () => {
    return (
        <ResizableBiPanel>
            <StoryBlock>
                <H3>Setting up SVG container</H3>
                <P> Let's start out by selecting our SVG container from DOM by using <Code>d3.select</Code></P>
                <CodeBlock maxWidth={600}>{sourceCodes[0]}</CodeBlock>
                <P>Assuming our SVG container already exist in DOM else create our container with <Code>d3.append</Code></P>
                <CodeBlock maxWidth={600}>{sourceCodes[1]}</CodeBlock>
                <P>I added a styling to see our SVG container.</P>
                <Svg />
            </StoryBlock>

            <div>b</div>
        </ResizableBiPanel>
    )
}

export default StoryBoard;

const lines = () => {
    return (
        <>
            <StoryBlock>
                <H3>Selecting our SVG container</H3>
                <P>In the previous section, we learned how to select and create our SVG container from and to DOM. <Anchor to={"/basics/shapes/rect"}>Click here</Anchor> to check it again</P>
                <P> Let's start out by selecting our SVG container from DOM by using <Code>d3.select</Code> :</P>
                <P>I added a styling to see our SVG container.</P>
                <Svg />
            </StoryBlock>

            <StoryBlock>
                <H3>Draw the Circle</H3>
                <P>We then draw our circle by appending a <Code>circle</Code> element on our SVG container using <Code>svg.append</Code> :</P>
                <CodeBlock maxWidth={600}>{sourceCodes[0]}</CodeBlock>
                <Svg><circle /></Svg>
                <P>At this point, we still won't be able to see our rectangle but trust me it's there. In order for our circle to be seen, we need to style it. So let's add size to our circle.</P>
                <P>Unlike <Code>rect</Code>, to size the <Code>circle</Code> we don't use width and height. Instead, we defined it's 'Radius' as attribute <Code>r</Code>.</P>
                <Svg><circle r="50" /></Svg>
                <P>Looking at our circle, we only see quarter of it. Because by default, elements without coordinates are located at 0,0[x & y] on the plane and our circle is anchored its center to it.</P>
                <P>We can however define it's coordinates by using <Code>cx</Code> and <Code>cy</Code>.</P>
                <CodeBlock maxWidth={600}>{sourceCodes[1]}</CodeBlock>
                <P>Now our circle will look like this</P>
                <Svg><circle r="50" cx="100" cy="75" /></Svg>
            </StoryBlock>

            <StoryBlock>
                <P>We just add a little fill color. And now our code would look like:</P>
                <CodeBlock maxWidth={600}>{sourceCodes[2]} </CodeBlock>
                <P>And our Circle would look like this:</P>
                <Svg><circle r="50" cx="100" cy="75" fill="cornflowerblue" /></Svg>
            </StoryBlock>
        </>
    )
}

const Svg = ({ children }: any) => (
    <svg width="200" height="150" style={{ background: "#f7f7f7" }}>{children}</svg>
);

const sourceCodes = [
    `const circle = svg.append("circle")`,

    `circle.attr("cx", 10).attr("cy", 25);`,

    `//Select our SVG Container
    const svg = d3.select('svg');
    
//Draw our Circle
const circle = svg.append("circle");
    
//Style our Circle
circle.attr("r", 50)
        .attr("cx", 100)
        .attr("cy", 75)
        .attr("fill", "cornflowerblue");`
];