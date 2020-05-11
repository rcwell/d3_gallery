
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import {
    select,
    scaleLinear,
    axisBottom,
    axisLeft,
    scaleBand,
    Selection,
    scaleOrdinal,
    schemeSet2,
} from 'd3';
import { randomNum } from 'App/utils';

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
interface Sales {
    month: string;
    value: number;
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septment", "October", "November", "December"];

const margin: Margin = { top: 60, right: 20, bottom: 60, left: 150 };
const height = 500;
const width = 800;
export const Stacked = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [dataSets, setDataSets] = React.useState<Array<Array<Sales>>>(Array);

    React.useEffect(() => {
        const sets = Array(3).fill(0).map(() => (
            months.map(month => ({
                month,
                value: randomNum(5, 25)
            }))
        ));
        setDataSets(sets);
    }, []);

    /** ValueGetters **/
    const yValue = (d: Sales): any => d.value;

    /** Scalers **/
    const yScale = scaleLinear()
        .domain([100, 0])
        .range([0, height - margin.top - margin.bottom]);
    const xScale = scaleBand()
        .domain(months)
        .range([0, width - margin.left - margin.right])
        .padding(0.1);

    /** Draw X&Y Axis **/
    const drawAxis = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const innerHeight = height - margin.top - margin.bottom;
        container.select('.x-axis')
            .call(axisBottom(xScale) as any)
            .attr('transform', `translate(0,${innerHeight})`);
        container.select('.y-axis')
            .call(axisLeft(yScale) as any)
    }, [xScale, yScale]);

    /** Draw BarPath **/
    const drawBarPath = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const innerHeight = height - margin.top - margin.bottom;
        const defaultBarWidth = xScale.bandwidth();
        const colorScale = scaleOrdinal()
            .domain(dataSets.map((_, i) => `datasetGroup${i + 1}`))
            .range(schemeSet2);

        const multiScales = dataSets
            .reduce((
                acc: Array<Array<{ x: number, height: number, y: number }>>,
                curr,
                i) => ([
                    ...acc,
                    curr.map((d, j) => ({
                        x: xScale(d.month) || 0,
                        height: innerHeight - yScale(yValue(d)),
                        y: i > 0 ? acc[i - 1][j].height + acc[i - 1][j].y : 0
                    }))
                ]), []);

        dataSets.forEach((ds, i) => {
            const className = `datasetGroup${i + 1}`;
            const color = colorScale(className);

            const barGroupData = container.selectAll<SVGGElement, null>(`.${className}`).data([0]);
            const barGroup = barGroupData.enter().append('g').attr('class', className);

            const bars = barGroup.selectAll<SVGRectElement, null>('rect');
            const barsData = bars.data(ds);

            barsData
                .enter()
                .append('rect')
                .style('transform', 'scaleY(-1)')
                .attr('fill', color as string)
                .attr('x', (_, j) => multiScales[i][j].x)
                .attr('y', (_, j) => multiScales[i][j].y)
                .attr('width', defaultBarWidth)
                .attr('height', (_, j) => multiScales[i][j].height);

            const labels = barGroup.selectAll<SVGTextElement, null>('text');
            const labelsData = labels.data(ds);

            labelsData
                .enter()
                .append('text')
                .text(d => d.value)
                .attr('x', (_, j) => multiScales[i][j].x + (defaultBarWidth / 2))
                .attr('text-anchor', 'middle')
                .attr('y', (_, j) => -multiScales[i][j].y - (multiScales[i][j].height / 2))
                .attr('dy', '0.32em')
                .attr('fill', 'currentColor');
        });
    }, [dataSets, xScale, yScale])

    /** Draw Legend **/
    const drawLegends = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const keys = dataSets.map((_, i) => `Dataset${i + 1}`);
        const colorScale = scaleOrdinal()
            .domain(dataSets.map((_, i) => `Dataset${i + 1}`))
            .range(schemeSet2);

        container.selectAll("mydots")
            .data(keys)
            .enter()
            .append("circle")
            .attr("class", "mydots")
            .attr("cy", (_, i) => (i * 20) - 7)
            .attr("r", 7)
            .style("fill", d => colorScale(d) as string);

        container.selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("x", 15)
            .attr("y", (_, i) => i * 20)
            .style("fill", (d) => colorScale(d) as string)
            .text((d) => d)
            .attr("text-anchor", "left")
            .style("alignment-basearea", "middle");
    }, [dataSets]);

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = select(svgRef.current);

        const axisGroup = _svg.select<SVGGElement>('.axisGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAxis(axisGroup);

        const barGroup = _svg.select<SVGGElement>('.barGroup')
            .attr('transform', `translate(${margin.left}, ${height - margin.top})`);
        drawBarPath(barGroup);

        const legendGroup = _svg.select<SVGGElement>('.legendGroup')
            .attr('transform', `translate(${20},${margin.top + 20})`);
        drawLegends(legendGroup);
    }, [svgRef, dataSets, drawAxis, drawBarPath, drawLegends]);


    return (
        <RouteWrapper
            title={"Stacked Bar Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "stacked"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <svg width={800} height={500} ref={svgRef}>
                <g className={"barGroup"} />
                <g className={"axisGroup"}>
                    <g className={"x-axis"} />
                    <g className={"y-axis"} />
                </g>
                <g className={"legendGroup"} />
            </svg>
        </RouteWrapper>
    )
}