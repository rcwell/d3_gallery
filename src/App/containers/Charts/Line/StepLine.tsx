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
    line,
    curveStepAfter
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

const margin: Margin = { top: 60, right: 20, bottom: 60, left: 100 };
const height = 500;
const width = 800;


export const StepLine = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [data, setData] = React.useState<Array<Sales>>(Array);

    React.useEffect(() => {
        const sales = months.map(month => ({
            month,
            value: randomNum(1, 100)
        }));
        setData(sales);
    }, []);

    /** ValueGetters **/
    const xValue = (d: Sales): any => d.month;
    const yValue = (d: Sales): any => d.value;

    /** Scalers **/
    const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, width - margin.left - margin.right]);
    const yScale = scaleLinear()
        .domain([0, 100])
        .range([height - margin.top - margin.bottom, 0]);

    /** Draw X&Y Axis **/
    const drawAxis = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const innerHeight = height - margin.top - margin.bottom;
        container.select('.x-axis')
            .call(axisBottom(xScale) as any)
            .attr('transform', `translate(0,${innerHeight})`);
        container.select('.y-axis')
            .call(axisLeft(yScale) as any)
    }, [xScale, yScale]);

    /** LinePath Generator **/
    const lineGenerator = line()
        .x((d: any) => xScale(xValue(d)) || 0)
        .y((d: any) => yScale(yValue(d)))
        .curve(curveStepAfter);

    /** Draw LinePath **/
    const drawLinePath = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const lineData: any = data;
        const lineGroup = container.selectAll<SVGPathElement, null>('path');
        const lineGroupData = lineGroup.data([lineData]);

        lineGroupData
            .enter()
            .append('path')
            .merge(lineGroupData)
            .attr('d', lineGenerator(lineData) || "")
            .attr('fill', 'none')
            .attr('stroke', 'cornflowerblue')
            .attr('stroke-width', '3')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
    }, [data, lineGenerator])

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = select(svgRef.current);

        const axisGroup = _svg.select<SVGGElement>('.axisGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAxis(axisGroup);
        const lineGroup = _svg.select<SVGGElement>('.lineGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawLinePath(lineGroup);
    }, [svgRef, data, drawAxis, drawLinePath]);

    return (
        <RouteWrapper
            title={"Step Line Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "stepline"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <svg width={width} height={height} ref={svgRef}>
                <g className={"lineGroup"} />
                <g className={"axisGroup"}>
                    <g className={"x-axis"} />
                    <g className={"y-axis"} />
                </g>
                <g className={"titleGroup"} />
            </svg>
        </RouteWrapper>
    )
}