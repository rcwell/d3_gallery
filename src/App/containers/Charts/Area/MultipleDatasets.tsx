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
    area,
    curveBasis,
    scaleOrdinal,
    schemeSet2
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

const margin: Margin = { top: 60, right: 20, bottom: 60, left: 120 };
const height = 500;
const width = 800;


export const MultipleDatasets = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [dataSets, setDataSets] = React.useState<Array<Array<Sales>>>(Array);

    React.useEffect(() => {
        const ds1: Array<Sales> = [];
        const ds2: Array<Sales> = [];
        months.forEach(month => {
            ds1.push({
                month,
                value: randomNum(1, 100)
            });
            ds2.push({
                month,
                value: randomNum(1, 100)
            });
        });

        setDataSets([ds1, ds2]);
    }, []);

    /** ValueGetters **/
    const xValue = (d: Sales): any => d.month;
    const yValue = (d: Sales): any => d.value;

    /** Scalers **/
    const xScale = scaleBand()
        .domain(months)
        .range([0, width - margin.left - margin.right])
        .align(0.5);
    const yScale = scaleLinear()
        .domain([0, 100])
        .range([height - margin.top - margin.bottom, 0]);

    /** Draw X&Y Axis **/
    const drawAxis = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const innerHeight = height - margin.top - margin.bottom;
        const innerWidth = width - margin.left - margin.right;

        const xAxis = axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickPadding(15);
        const yAxis = axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(15);

        const xAxisGroup = container.select<SVGGElement>('.x-axis')
            .call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);
        const yAxisGroup = container.select<SVGGElement>('.y-axis')
            .call(yAxis);

        yAxisGroup
            .append('text')
            .text('Values')
            .attr('fill', 'currentColor')
            .attr('y', -50)
            .attr('x', -innerHeight / 2)
            .attr('font-size', '1.3em')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)');
        xAxisGroup
            .append('text')
            .text('Month')
            .attr('fill', 'currentColor')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .attr('font-size', '1.3em');

        container.selectAll('path')
            .attr('stroke', "#636363");
    }, [xScale, yScale]);

    /** AreaPath Generator **/
    const areaGenerator = area()
        .x((d: any) => xScale(xValue(d)) || 0)
        .y0(height - margin.top - margin.bottom)
        .y1((d: any) => yScale(yValue(d)))
        .curve(curveBasis);

    /** Draw AreaPath **/
    const drawAreaPath = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const colorScale = scaleOrdinal()
            .domain(dataSets.map((_, i) => `.path${i}`))
            .range(schemeSet2);

        dataSets.forEach((ds, i) => {
            const className = `.path${i}`;
            const areaData: any = ds;
            const areaGroup = container.selectAll<SVGPathElement, null>(className);
            const areaGroupData = areaGroup.data([areaData]);
            const color = colorScale(className);
            areaGroupData
                .enter()
                .append('path')
                .attr('class', className)
                .merge(areaGroupData)
                .attr('opacity','0.5')
                .attr('d', areaGenerator(areaData) || "")
                .attr('fill', color as string)
        });
    }, [dataSets, areaGenerator]);

    /** Draw Legend **/
    const drawLegends = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const keys = dataSets.map((_, i) => `Path${i}`);
        const colorScale = scaleOrdinal()
            .domain(dataSets.map((_, i) => `Path${i}`))
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


    /** Draw Title **/
    const drawTitle = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        container
            .selectAll('text')
            .data([0])
            .enter()
            .append('text')
            .text(`Multiple Datasets`)
            .attr('font-size', '1.5em')
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'middle');
        const { height } = container.node()!.getBBox();
        container
            .attr('transform', `translate(${margin.left + ((width - margin.left - margin.right) / 2)},${height})`);
    }, []);

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = select(svgRef.current);

        const axisGroup = _svg.select<SVGGElement>('.axisGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAxis(axisGroup);
        const areaGroup = _svg.select<SVGGElement>('.areaGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAreaPath(areaGroup);

        const legendGroup = _svg.select<SVGGElement>('.legendGroup')
            .attr('transform', `translate(${20},${margin.top})`);
        drawLegends(legendGroup);

        const titleGroup = _svg.select<SVGGElement>('.titleGroup');
        drawTitle(titleGroup);

    }, [svgRef, dataSets, drawAxis, drawAreaPath, drawLegends, drawTitle]);

    return (
        <RouteWrapper
            title={"Multiple Datasets Area Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "MultipleDatasets"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <svg width={800} height={500} ref={svgRef}>
                <g className={"areaGroup"} />
                <g className={"axisGroup"}>
                    <g className={"x-axis"} />
                    <g className={"y-axis"} />
                </g>
                <g className={"titleGroup"} />
                <g className={"legendGroup"} />
            </svg>
        </RouteWrapper>
    )
}