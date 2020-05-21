import React from 'react';
import * as d3 from 'd3';
import { CodeBlock } from 'App/components/Typography';

export const Coordinates = () => {
    React.useEffect(() => {
        const svg = d3.select<SVGSVGElement, unknown>('#plotting-container');

        const rect = svg.select('.rect');
        rect
            .attr('x', 100)
            .attr('y', 80);

        const circle = svg.select('.circle');
        circle
            .attr('cx', 500)
            .attr('cy', 220);
    }, []);

    return (
        <>
            <svg style={{ margin: '0 auto', background: '#f7f7f7' }} id="plotting-container" height="300" width="800">
                <circle fill="#6495ed" r="50" className={'circle'} />
                <rect fill="#6495ed" width="200" height="100" className={'rect'} />
            </svg>
            <CodeBlock>
                {`
// Get SVG Container
const svg = d3.select<SVGSVGElement, unknown>('#plotting-container');

// Get rect element Container
const rect = svg.select('.rect');
// For defining coordinates, we use x & y attributes
rect
    .attr('x', 100)
    .attr('y', 80);

// Get circle element Container
const circle = svg.select('.circle');
// For defining coordinates, we use cx & cy attributes
circle
    .attr('cx', 500)
    .attr('cy', 220);
`}
            </CodeBlock>
        </>
    )
}
