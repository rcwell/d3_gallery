import React, { useRef, useEffect, useState } from 'react';
import { SVGProps, ChartProps, HorizontalChartProps } from '../index';
import { rem } from 'App/utils';
import {
    select,
    axisBottom,
    axisLeft,
    scaleLinear,
    scaleBand,
    Selection,
    scaleOrdinal,
    schemeSet2,
    event
} from 'd3';
import styled from 'styled-components';


interface BarChartProps extends SVGProps, ChartProps, HorizontalChartProps {
    series: Array<Series>;
}

interface Series {
    name: string;
    data: Array<BarData>;
}
interface BarData {
    x: number;
    y: string;
}
const legendRadius = 7;
export const Bar = (props: BarChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [innerSize, setInnerSize] = useState({ height: 0, width: 0 });
    const [scalers, setScalers] = useState(Object);
    const [activeDatasets, setActiveDatasets] = useState<Array<string>>(Array);

    const {
        height, width, margin, xaxis, yaxis, series, colorsScheme, legend, title
    } = props;

    // Scalers
    useEffect(() => {
        // Save for later
        // const xValues = series.map(s => s.data.map(d => d.x)).flat();
        const x = scaleLinear()
            .domain([0, 100])
            .range([0, innerSize.width]);
        const y = scaleBand()
            .domain(yaxis.categories || [])
            .range([0, innerSize.height])
            .padding(0.1);
        const colors = scaleOrdinal()
            .domain(series.map(s => s.name))
            .range((colorsScheme || []).concat(schemeSet2));

        setScalers({
            x,
            y,
            colors
        });
    }, [xaxis, yaxis, series, innerSize, colorsScheme])

    // Sizing 
    useEffect(() => {
        const { top, left, right, bottom } = margin;
        const innerHeight = height - top - bottom;
        const innerWidth = width - left - right;
        setInnerSize({
            height: innerHeight,
            width: innerWidth
        });
    }, [margin, height, width]);

    // X&Y Axis
    const drawAxis = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        if ('x' in scalers) {
            const xAxis = axisBottom(scalers.x).tickPadding(15)
                .tickSize(-innerSize.height);
            const xAxisGroup = container.select<SVGGElement>('.x-axis')
                .call(xAxis)
                .attr('transform', `translate(0,${innerSize.height})`);

            let offset = {
                y: 50,
                x: xaxis.title.align === 'middle' ? innerSize.width / 2 : xaxis.title.align === 'end' ? innerSize.width : 0
            }
            if (xaxis.offset !== undefined) {
                offset = {
                    x: offset.x + (xaxis.offset.bottom || 0) - (xaxis.offset.top || 0),
                    y: offset.y + (xaxis.offset.right || 0) - (xaxis.offset.left || 0)
                }
            }

            xAxisGroup.select('.domain').remove();
            xAxisGroup.select<SVGTextElement>('.title')
                .text(xaxis.title.text)
                .attr('fill', 'currentColor')
                .attr('y', offset.y)
                .attr('x', offset.x)
                .attr('text-anchor', xaxis.title.align)
                .attr('font-size', '1.3em')

        }

        if ('y' in scalers) {
            const yAxis = axisLeft(scalers.y).tickPadding(15);
            const yAxisGroup = container.select<SVGGElement>('.y-axis')
                .call(yAxis);

            let offset = {
                y: -50,
                x: -(yaxis.title.align === 'middle' ? innerSize.height / 2 : yaxis.title.align === 'end' ? innerSize.height - 50 : 50)
            }
            if (yaxis.offset !== undefined) {
                offset = {
                    x: offset.x - (yaxis.offset.bottom || 0) + (yaxis.offset.top || 0),
                    y: offset.y - (yaxis.offset.right || 0) + (yaxis.offset.left || 0)
                }
            }

            yAxisGroup.select<SVGTextElement>('.title')
                .attr('fill', 'currentColor')
                .attr('y', offset.y)
                .attr('font-size', '1.3em')
                .attr('transform', 'rotate(-90)')
                .attr('x', offset.x)
                .attr('text-anchor', yaxis.title.align)
                .text(yaxis.title.text);
        }
    }, [scalers, innerSize, xaxis, yaxis]);

    // Draw Bars
    const drawBarRect = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        if (Object.keys(scalers).length === 0) return;
        let minHeight = scalers.y.bandwidth();
        if (minHeight === 0) return;

        const groupBarSpacing = 0.5;
        const groupsSpacing = 5;

        minHeight = minHeight - groupsSpacing;

        const showSeries = series.filter(s => activeDatasets.includes(s.name));
        const seriesCount = showSeries.length;
        const thickness = (minHeight / seriesCount) - groupBarSpacing;

        const barGroupData = container.selectAll<SVGGElement, null>('g')
            .data(showSeries);
        const barGroup = barGroupData
            .enter()
            .append('g')
            .merge(barGroupData)
            .attr('class', d => d.name);
        const barsData = barGroup.selectAll<SVGRectElement, null>('rect')
            .data((d, i: number) => d.data.map(t => ({
                x: t.x,
                y: t.y,
                color: scalers.colors(d.name),
                name: d.name,
                i
            })));

        barsData
            .enter()
            .append('rect')
            .merge(barsData)
            .on('mouseenter', drawHoverOnIndex)
            .on('mouseleave', () => {
                select('.tooltip')
                    .style('display', 'none');
            })
            .attr('fill', d => d.color)
            .attr('y', d => ((thickness * d.i) + scalers.y(d.y)! + ((groupBarSpacing * (d.i + 1)) * 2)) + ((groupsSpacing / seriesCount)))
            .attr('height', thickness)
            .transition().duration(200)
            .attr('width', d => scalers.x(d.x));
        barGroupData
            .exit()
            .selectAll('rect')
            .transition().duration(200)
            .attr('width', 0)
            .remove();
    }, [series, scalers, activeDatasets]);

    // Tooltip
    const drawHoverOnIndex = ({ x, y, color, name }: any) => {
        const tooltip = select('.tooltip')
            .style('display', 'inline-block');

        tooltip.select('.header')
            .html(`${y}`);

        const ulList = tooltip.select('.body')
            .select<HTMLUListElement>('ul');

        const _li = ulList.selectAll<HTMLLIElement, unknown>('li').data([0]);
        _li
            .enter()
            .append('li')
            .merge(_li)
            .html(() => `
            <span>
                <div style="background:${color}"></div>
                ${name}:
            </span> 
            <span>
                ${x}
            </span>`);
        _li
            .exit()
            .remove();

        tooltip
            .transition().duration(100)
            .style('top', (event.pageY - 35) + 'px')
            .style('left', (event.pageX + 10) + 'px');
    };

    // Draw Legends
    const drawLegends = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        if (Object.keys(scalers).length === 0) return;
        const { alignToParentSvg, align } = legend;

        const baseHeight = alignToParentSvg ? height : innerSize.height + margin.top;
        const offsetY = alignToParentSvg ? rem : margin.top;

        const legendsHeight = series.length * (rem + (alignToParentSvg ? 1 : -1));
        let y = 0;
        switch (align) {
            case 'start':
                y = offsetY;
                break;
            case 'end':
                y = baseHeight - legendsHeight;
                break;
            default:
                y = (baseHeight + (alignToParentSvg ? 0 : margin.top)) / 2 - (legendsHeight / 2);
                break;
        }
        const x = legendRadius + 20;
        container
            .attr('transform', `translate(${x},${y})`);

        const keys = series.map(s => s.name);
        const legendGroupData = container.selectAll<SVGGElement, unknown>(".legend").data(keys);

        const legendGroup = legendGroupData
            .enter()
            .append("g")
            .merge(legendGroupData)
            .attr("class", d => activeDatasets.includes(d) ? 'legend' : 'legend inactive')
            .on('mouseenter', (classname: string) => {
                const barGroup = select<SVGGElement, null>('.barGroup');
                barGroup
                    .selectAll('g')
                    .transition().duration(200)
                    .style('opacity', 0.2);
                barGroup.select(`.${classname}`)
                    .transition().duration(200)
                    .style('opacity', 1);
            })
            .on('click', (cx: string) => {
                setActiveDatasets(prev => prev.includes(cx)
                    ? prev.filter(x => x !== cx)
                    : prev.concat([cx])
                );
            })
            .on('mouseleave', () => {
                select<SVGGElement, null>('.barGroup')
                    .selectAll('g')
                    .transition().duration(200)
                    .style('opacity', 1);
            });
        legendGroup
            .append("circle")
            .attr("class", "dot")
            .attr("cy", (_, i) => i * 25)
            .attr("r", legendRadius)
            .style("fill", d => scalers.colors(d) as string);

        legendGroup
            .append("text")
            .attr("class", "label")
            .attr("x", 15)
            .attr("y", (_, i) => i * 25)
            .style("fill", (d) => scalers.colors(d) as string)
            .text((d) => d)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

        legendGroupData
            .exit()
            .remove();
    }, [series, scalers, legend, margin, height, innerSize, activeDatasets]);

    // Draw Title
    const drawTitle = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const { text, align, location, alignToParentSvg } = title;

        const baseLeft = alignToParentSvg ? 0 : margin.left;
        const x = align === 'start' ? baseLeft : align === 'end' ? width : (width + baseLeft) / 2;
        const y = location === 'top' ? rem + 20 : height - 20;

        container
            .select('.title')
            .text(text)
            .attr('font-size', '1.5em')
            .attr('fill', 'currentColor')
            .attr('text-anchor', align)
            .attr('transform', `translate(${x},${y})`);
    }, [width, height, title, margin]);

    // GroupSelections
    useEffect(() => {
        if (svgRef.current === null) return;
        const { left, top } = margin;

        const svg = select(svgRef.current);
        const axisGroup = svg.select<SVGGElement>('.axisGroup').attr('transform', `translate(${left},${top})`);
        const barGroup = svg.select<SVGGElement>('.barGroup').attr('transform', `translate(${left},${top})`);
        const legendGroup = svg.select<SVGGElement>('.legendGroup');
        const titleGroup = svg.select<SVGGElement>('.titleGroup');

        drawBarRect(barGroup);
        drawAxis(axisGroup);
        drawLegends(legendGroup);
        drawTitle(titleGroup);
    }, [svgRef, margin, drawAxis, drawBarRect, drawLegends, drawTitle]);

    // Initial Active Series
    useEffect(() => {
        setActiveDatasets(series.map(s => s.name));
    }, [series]);

    return (
        <>
            <svg width={width} height={height} ref={svgRef}>
                <Axis className={"axisGroup"}>
                    <g className={"x-axis"} >
                        <text className={"title"} />
                    </g>
                    <g className={"y-axis"} >
                        <text className={"title"} />
                    </g>
                </Axis>
                <BarGroup className={"barGroup"} />
                <Legends className={"legendGroup"} />
                <g className={"titleGroup"} >
                    <text className={"title"} />
                </g>
            </svg>
            <Tooltip className={'tooltip'} >
                <div className={'header'} />
                <div className={'body'}>
                    <ul></ul>
                </div>
            </Tooltip>
        </>
    )
}
const BarGroup = styled.g`
    rect{
        cursor:pointer;

        &:hover{
            opacity:0.8;
        }
    }
`;
const Axis = styled.g`
    > .y-axis > .tick:nth-of-type(1) > rect{
        display:none; 
    }
    > .y-axis > .tick:nth-child(even) > rect{
        fill:#f7f7f7;        
    }
`;
const Legends = styled.g`
    text, circle {
        cursor:pointer;
    }

    & .inactive {
        opacity:0.3;
    }
`;
const Tooltip = styled.div`
    position: absolute;
    display: none;
    border-radius: 3px;
    box-shadow: 1px 6px 10px 0px #0003;
    background: #fff;
    border: 1px solid #e2e2e2;
    min-width: 100px;
    font-size: 0.7rem;

    > div{
        padding: 6px;
    }

    > .header {
        border-bottom: 1px solid #e2e2e2;
        padding: 6px;
        background: #eee;
        font-weight: bold;
    }

    > .body > ul{
        padding: 0;
        list-style: none;
        margin: 0;
    }
    
    > .body > ul > li{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
    }
    > .body > ul > li > span:first-child{
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    > .body > ul > li > span:first-child > div{
        height: 10px;
        width: 10px;
        border-radius: 1rem;
        display: inline-block;
        margin-right:10px;
    }
    > .body > ul > li > span:last-child{
        font-weight: bold;
        margin-left:10px;
    }
`;