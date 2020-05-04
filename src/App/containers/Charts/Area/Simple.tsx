
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
    curveBasis
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

export const Simple = ({ location: { pathname } }: any) => {
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

    /** AreaPath Generator **/
    const areaGenerator = area()
        .x((d: any) => xScale(xValue(d)) || 0)
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
            .attr('fill', 'cornflowerblue');
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
            title={"Simple Area Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "simple"
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