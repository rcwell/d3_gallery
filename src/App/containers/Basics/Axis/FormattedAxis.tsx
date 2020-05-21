import React from 'react';
import * as d3 from 'd3';
import { CodeBlock } from 'App/components/Typography';

export const FormattedAxis = () => {
    React.useEffect(() => {
        const svg = d3.select<SVGSVGElement, unknown>('#single-axis-container');

        const width = 745;
        const height = 270;

        const xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const xScale = d3.scaleBand()
            .domain(xValues)
            .rangeRound([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale)
            .tickFormat(d => `${d}%`);

        svg.select<SVGGElement>('.xAxis')
            .call(xAxis)
            .attr('transform', 'translate(35,280)');
        svg.select<SVGGElement>('.yAxis')
            .call(yAxis)
            .attr('transform', 'translate(35,10)');
    }, []);

    return (
        <>
            <svg style={{ margin: '0 auto' }} id="single-axis-container" height="300" width="800">
                <g className={'yAxis'} />
                <g className={'xAxis'} />
            </svg>
            <CodeBlock>
                {`
// Get SVG Container
const svg = d3.select<SVGSVGElement, unknown>('#single-axis-container');

// Get desired axis width and height
const width = 745;
const height = 270;

// Axis values
const xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Define scales
const xScale = d3.scaleBand()
    .domain(xValues)
    .rangeRound([0, width]);

const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

// Define axis
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale)
    .tickFormat(d => d + "%"); // ticks formatter

// Call axis to the svg container
svg.select<SVGGElement>('.xAxis')
    .call(xAxis)
    .attr('transform', 'translate(35,280)'); // location of the group

svg.select<SVGGElement>('.yAxis')
    .call(yAxis)
    .attr('transform', 'translate(35,10)'); // location of the group
`}
            </CodeBlock>
        </>
    )
}