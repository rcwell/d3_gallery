
import React from 'react';
import { P, Code, CodeBlock } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import * as d3 from 'd3';

export const ThresholdScale = () => {

    React.useEffect(() => {
        const colorRange = d3.scaleThreshold<number, string>()
            .domain([0, 25, 50, 75, 100])
            .range(['Green', 'Blue', 'Yellow', 'Orange', 'Red']);

        console.log(colorRange(24))
        console.log(colorRange(49))
        console.log(colorRange(87))
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000
        }}>
            <StoryBlock>
                <P>This scaler function accepts discrete array of domain split points to the range.</P>
                <P><Code>Domain</Code> array of split points</P>
                <P><Code>Range</Code> array of split values</P>

                <P>Example:</P>
                <CodeBlock>
                    {`const pointScale = d3.scaleThreshold<number, string>()
    .domain([0, 25, 50, 75, 100])                           // split points
    .range(['Green', 'Blue', 'Yellow', 'Orange', 'Red']);   // split values

colorRange(24) // returns Blue
colorRange(49) // returns Yellow
colorRange(87) // returns Red
`}
                </CodeBlock>
            </StoryBlock>
        </div>
    )
}
