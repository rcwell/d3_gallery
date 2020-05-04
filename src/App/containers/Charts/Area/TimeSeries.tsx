import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import {
    select,
    scaleLinear,
    axisBottom,
    axisLeft,
    Selection,
    area,
    curveBasis,
    csv,
    scaleTime,
    extent
} from 'd3';

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
interface Temperature {
    timestamp: Date;
    value: number;
}

const margin: Margin = { top: 60, right: 20, bottom: 60, left: 100 };
const height = 500;
const width = 800;


export const TimeSeries = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    const [data, setData] = React.useState<Array<Temperature>>(Array);

    React.useEffect(() => {
        csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv').then((data: any) => {
            setData(data.map((d: any) => ({
                timestamp: new Date(d.timestamp),
                value: +d.temperature
            })));
        });
    }, []);

    /** ValueGetters **/
    const xValue = (d: Temperature): any => d.timestamp;
    const yValue = (d: Temperature): any => d.value;
    const yAxisLabel = 'Temperature';
    const xAxisLabel = 'Time';

    /** Scalers **/
    const xScale = scaleTime()
        .domain((extent(data, xValue) as [number, number]))
        .range([0, width - margin.left - margin.right]);
    const yScale = scaleLinear()
        .domain((extent(data, yValue) as [number, number]))
        .range([height - margin.top - margin.bottom, 0])
        .nice();

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
            .text(yAxisLabel)
            .attr('fill', 'currentColor')
            .attr('y', -50)
            .attr('x', -innerHeight / 2)
            .attr('font-size', '1.3em')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)');
        xAxisGroup
            .append('text')
            .text(xAxisLabel)
            .attr('fill', 'currentColor')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .attr('font-size', '1.3em');

        container.selectAll('path')
            .attr('stroke', "#636363");

        container
            .selectAll('.domain')
            .remove();
    }, [xScale, yScale]);

    /** AreaPath Generator **/
    const areaGenerator = area()
        .x((d: any) => xScale(xValue(d)))
        .y0(height - margin.top - margin.bottom)
        .y1((d: any) => yScale(yValue(d)))
        .curve(curveBasis);

    /** Draw AreaPath **/
    const drawAreaPath = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const areaData: any = data;
        const areaGroup = container.selectAll<SVGPathElement, null>('path');
        const areaGroupData = areaGroup.data([areaData]);

        areaGroupData
            .enter()
            .append('path')
            .merge(areaGroupData)
            .attr('d', areaGenerator(areaData) || "")
            .attr('fill', 'cornflowerblue')
    }, [data, areaGenerator])

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = select(svgRef.current);

        const axisGroup = _svg.select<SVGGElement>('.axisGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAxis(axisGroup);
        const areaGroup = _svg.select<SVGGElement>('.areaGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAreaPath(areaGroup);
    }, [svgRef, data, drawAxis, drawAreaPath]);

    return (
        <RouteWrapper
            title={"Time Series Area Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "timeseries"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <svg width={800} height={500} ref={svgRef}>
                <g className={"areaGroup"} />
                <g className={"axisGroup"}>
                    <g className={"x-axis"} />
                    <g className={"y-axis"} />
                </g>
                <g className={"titleGroup"} />
            </svg>
        </RouteWrapper>
    )
}