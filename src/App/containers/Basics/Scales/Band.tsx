
import React from 'react';
import { P, Code, CodeBlock } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';

export const BandScale = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000
        }}>
            <StoryBlock>
                <P>This scaler creates scales based on the length of the defined domain. It is most commonly used for bar-chart to determine the size of bars scaled to the range.</P>
                <P><Code>Range</Code> is the minimum and maximum base value for scaling to.</P>
                <P><Code>Domain</Code> array of values to which the range will be scaled from.</P>

                <P>Example:</P>
                <CodeBlock>
                    {`const dayValueScale = d3.scaleBand()
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])    // days
    .range([0, 1000]);                              // value

// days are scaled starting from monday that values '0' to friday that values to '1000'

dayValueScale('Mon') // returns 0
dayValueScale('Wed') // returns 400
dayValueScale('Thu') // returns 600
`}
                </CodeBlock>
            </StoryBlock>
        </div>
    )
}
