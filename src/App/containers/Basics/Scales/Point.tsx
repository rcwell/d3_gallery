
import React from 'react';
import { P, Code, CodeBlock } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import * as d3 from 'd3';

export const PointScale = () => {

    React.useEffect(() => {
        const pointScale = d3.scalePoint()
            .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
            .range([0, 100]);

        console.log(pointScale('Wed'))
        console.log(pointScale('Tue'))
        console.log(pointScale('Fri'))
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000
        }}>
            <StoryBlock>
                <P>This scaler function maps discrete domain value to range equaly spaced from min to max without padding.</P>
                <P><Code>Domain</Code> is range of the input values.</P>
                <P><Code>Range</Code> is the min to max output values.</P>

                <P>Example:</P>
                <CodeBlock>
                    {`const pointScale = d3.scalePoint()
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])    // days
    .range([0,100]);                                // output range

pointScale('Wed') // returns 50
pointScale('Tue') // returns 25
pointScale('Fri') // returns 100
`}
                </CodeBlock>
            </StoryBlock>
        </div>
    )
}
