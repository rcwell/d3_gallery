
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
    scaleThreshold,
} from 'd3';
import { randomNum } from 'App/utils';
import { ColumnBar } from 'App/components/Charts';

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
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const margin: Margin = { top: 60, right: 20, bottom: 60, left: 100 };
const height = 500;
const width = 800;
export const Negative = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [data, setData] = React.useState<Array<Sales>>(Array);
    const [data2, setData2] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        setData2(Array(2).fill(0).map((_, i) => ({
            name: `Dataset_${i + 1}`,
            data: months.map((month,j) => ({
                x: month,
                y: j === 7 ? 0 : randomNum(-50, 50)
            }))
        })))
    }, []);

    React.useEffect(() => {
        const sales = months.map((month, i) => ({
            month,
            value: randomNum(i > 7 ? -100 : 1, 100)
        }));
        setData(sales);
    }, []);

    /** ValueGetters **/
    const yValue = (d: Sales): any => d.value;

    /** Scalers **/
    const yScale = scaleLinear()
        .domain([100, -100])
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
            height: (innerHeight - yScale(yValue(d))) - yScale(0)
        }));

        const colorScale = scaleThreshold<number, string>()
            .domain([-1, 1])
            .range(["#d55045", "#6495ed"]);

        barGroupData
            .enter()
            .append('rect')
            .style('transform', 'scaleY(-1)')
            .attr('fill', d => colorScale(d.value))
            .attr('x', (_, i) => scales[i].x)
            .attr('width', defaultBarWidth)
            .attr('y', (_, i) => scales[i].height > 0 ? 0 : scales[i].height)
            .attr('height', (_, i) => Math.abs(scales[i].height));
    }, [data, xScale, yScale])

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = select(svgRef.current);

        const axisGroup = _svg.select<SVGGElement>('.axisGroup')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        drawAxis(axisGroup);
        const barGroup = _svg.select<SVGGElement>('.barGroup')
            .attr('transform', `translate(${margin.left}, ${(height - margin.top + margin.bottom) / 2})`);
        drawBarPath(barGroup);
    }, [svgRef, data, drawAxis, drawBarPath]);


    return (
        <RouteWrapper
            title={"Negative Bar Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Negative"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <ColumnBar
                midAligned
                margin={{ top: 60, right: 20, bottom: 60, left: 180 }}
                height={500}
                width={800}
                series={data2}
                title={{
                    text: 'Sales',
                    align: 'middle',
                    location: 'top'
                }}
                yaxis={{
                    title: {
                        text: "Quantity",
                        align: 'middle'
                    },
                    // min: -50,
                    // max: 80
                }}
                xaxis={{
                    categories: months,
                    title: {
                        text: 'Months',
                        align: 'middle'
                    }
                }}
                legend={{
                    location: 'left',
                    align: 'start',
                }}
                colorsScheme={[
                    "#6494ED",
                    "#ffcf00",
                    "#FFA15C",
                    "#FFC65C",
                ]} />
        </RouteWrapper>
    )
}