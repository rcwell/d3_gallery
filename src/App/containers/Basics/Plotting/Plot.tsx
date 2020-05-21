import React from 'react';
import * as d3 from 'd3';
import { CodeBlock } from 'App/components/Typography';

export const Plot = () => {
    React.useEffect(() => {
        const svg = d3.select<SVGSVGElement, unknown>('#single-axis-container');
        const mainGroup = svg.select<SVGGElement>('.mainGroup')
            .attr('transform', 'translate(35,10)');

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

        mainGroup.select<SVGGElement>('.xAxis')
            .call(xAxis)
            .attr('transform', 'translate(0,270)');
        mainGroup.select<SVGGElement>('.yAxis')
            .call(yAxis);

        mainGroup.select<SVGCircleElement>('.circle')
            .attr('cx', (xScale('Thursday') || 0) + (xScale.bandwidth() / 2))
            .attr('cy', yScale(10))

        mainGroup.select<SVGCircleElement>('.rect')
            .attr('x', (xScale('Sunday') || 0) + (xScale.bandwidth() / 2))
            .attr('y', yScale(90))


    }, []);

    return (
        <>
            <svg style={{ margin: '0 auto' }} id="single-axis-container" height="300" width="800">
                <g className={"mainGroup"}>
                    <g className={'yAxis'} />
                    <g className={'xAxis'} />
                    <circle fill="#6495ed" r="10" className={'circle'} />
                    <rect fill="#6495ed" height="10" width="20" className={'rect'} />
                </g>
            </svg>
            <CodeBlock>
                {`
// Get SVG Containers
const svg = d3.select<SVGSVGElement, unknown>('#single-axis-container');
const mainGroup = svg.select<SVGGElement>('.mainGroup')
.attr('transform', 'translate(35,10)');

//======= Creating our Axis =========//
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

// Call axis to the container
mainGroup.select<SVGGElement>('.xAxis')
    .call(xAxis)
    .attr('transform', 'translate(35,280)'); // location of the group

mainGroup.select<SVGGElement>('.yAxis')
    .call(yAxis)
    .attr('transform', 'translate(35,10)'); // location of the group

//======= Plotting our Elements =========//
// Get our circle element and defined it's x&y attribute values using scalers by passing value to the corresponding scaler
mainGroup.select<SVGCircleElement>('.circle')
    .attr('cx', (xScale('Thursday') || 0) + (xScale.bandwidth() / 2)) // after passing on scaler, I added half of the bandiwdth
    .attr('cy', yScale(10))                                           // of the xScaler to center the element

mainGroup.select<SVGCircleElement>('.rect')
    .attr('x', (xScale('Sunday') || 0) + (xScale.bandwidth() / 2))
    .attr('y', yScale(90))
`}
            </CodeBlock>
        </>
    )
}