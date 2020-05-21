import React from 'react';
import * as d3 from 'd3';
import { CodeBlock } from 'App/components/Typography';

export const SingleAxis = () => {
    React.useEffect(() => {
        // Get SVG Container
        const svg = d3.select<SVGSVGElement, unknown>('#single-axis-container');

        // Get desired axis width
        const width = +svg.attr('width');

        // Axis values
        const values = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        // Define scale
        const scale = d3.scaleBand()
            .domain(values)
            .rangeRound([0, width]);

        // Define axis
        const axis = d3.axisBottom(scale);

        // Call axis to the svg container
        svg.call(axis);
    }, []);

    return (
        <>
            <svg style={{ margin: '0 auto' }} id="single-axis-container" height="50" width="800"></svg>
            <CodeBlock>
{`// Get SVG Container
const svg = d3.select<SVGSVGElement, unknown>('#single-axis-container');

// Get desired axis width
const width = +svg.attr('width');

// Axis values
const values = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Define scale
const scale = d3.scaleBand()
    .domain(values)
    .rangeRound([0, width]);

// Define axis
const axis = d3.axisBottom(scale);

// Call axis to the svg container
svg.call(axis);
`}
            </CodeBlock>
        </>
    )
}