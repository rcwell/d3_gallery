
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
export const Column = ({ location: { pathname } }: any) => {
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

        const barData: Array<Sales> = data;
        const barGroup = container.selectAll<SVGPathElement, null>('rect');
        const barGroupData = barGroup.data(barData);

        const defaultBarWidth = xScale.bandwidth();
        const scales = data.map((d) => ({
            x: xScale(d.month) || 0,
            height: innerHeight - yScale(yValue(d))
        }));

        barGroupData
            .enter()
            .append('rect')
            .style('transform', 'scaleY(-1)')
            .attr('fill', 'cornflowerblue')
            .attr('x', (_, i) => scales[i].x)
            .attr('width', defaultBarWidth)
            .attr('height', (_, i) => scales[i].height);
    }, [data, xScale, yScale])

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = select(svgRef.current);

        const axisGroup = _svg.select<SVGGElement>('.axisGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAxis(axisGroup);
        const barGroup = _svg.select<SVGGElement>('.barGroup')
            .attr('transform', `translate(${margin.left}, ${height - margin.top})`);
        drawBarPath(barGroup);
    }, [svgRef, data, drawAxis, drawBarPath]);


    return (
        <RouteWrapper
            title={"Column Bar Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "column"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <svg width={800} height={500} ref={svgRef}>
                <g className={"barGroup"} />
                <g className={"axisGroup"}>
                    <g className={"x-axis"} />
                    <g className={"y-axis"} />
                </g>
                <g className={"titleGroup"} />
            </svg>
        </RouteWrapper>
    )
}