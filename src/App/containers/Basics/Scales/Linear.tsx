
import React from 'react';
import { P, Code, CodeBlock } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';

export const LinearScale = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000
        }}>
            <StoryBlock>
                <P>Most commonly used scaler from d3 for transform inputs into user defined range and domain.</P>
                <P><Code>Range</Code> is the minimum and maximum expected value to be scaled down/up to the domain.</P>
                <P><Code>Domain</Code> is the minimum and maximum value to scale the range into.</P>

                <P>Example:</P>
                <CodeBlock>
                    {`const kilometerToPixel = d3.scaleLinear()
    .domain([0, 5])     // kilometer
    .range([0, 1000]);  // pixels

// we want to tranform kilometer values into pixel values
// we will made our scale to maximum kilometer which is 5km to be equal to 1000px

kilometerToPixel(2) // returns 400
kilometerToPixel(4) // returns 500
kilometerToPixel(1) // returns 100
`}
                </CodeBlock>
            </StoryBlock>
        </div>
    )
}
