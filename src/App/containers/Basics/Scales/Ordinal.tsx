
import React from 'react';
import { P, Code, CodeBlock } from 'App/components/Typography';
import { StoryBlock } from 'App/components/Styled';
import * as d3 from 'd3';

export const OrdinalScale = () => {

    React.useEffect(() => {
        const scaleBand = d3.scaleOrdinal()
            .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
            .range(['Green', 'Blue', 'Yellow', 'Orange', 'Red']);

        console.log(scaleBand('Mon'))
        console.log(scaleBand('Wed'))
        console.log(scaleBand('Thu'))
    }, [])

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000
        }}>
            <StoryBlock>
                <P>This scaler discretely maps domain value to range value by index. The range array will repeat if it's shorter than the domain array.</P>
                <P><Code>Domain</Code> is the possible input values.</P>
                <P><Code>Range</Code> is the array of output values.</P>

                <P>Example:</P>
                <CodeBlock>
                    {`const scaleBand = d3.scaleOrdinal()
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])            // days
    .range(['Green', 'Blue', 'Yellow', 'Orange', 'Red']);   // color

// days are scaled starting from 'Mon' will be 'Green', 'Tue' will be 'Blue', and so on.

scaleBand('Wed') // returns Yellow
scaleBand('Tue') // returns Blue
scaleBand('Fri') // returns Red
`}
                </CodeBlock>
            </StoryBlock>
        </div>
    )
}
