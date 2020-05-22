import React, { useRef, useEffect, useState } from 'react';
import { SVGProps, ChartProps, VerticalChartProps } from '../index';
import { rem, textWrap } from 'App/utils';
import {
    select,
    axisBottom,
    axisLeft,
    scaleLinear,
    scaleBand,
    Selection,
    scaleOrdinal,
    area,
    line,
    schemeSet2,
    curveCatmullRom,
    curveStepAfter,
    scaleTime,
    extent,
    event
} from 'd3';
import styled from 'styled-components';

interface AreaChartProps extends SVGProps, ChartProps, VerticalChartProps {
    series: Array<Series | TimeSeries>;
    stroke?: {
        curve?: "smooth" | "step"
    }
}

interface Series {
    name: string;
    data: Array<AreaData>;
}

interface TimeSeries {
    name: string;
    data: Array<TimeData>;
}

interface TimeData {
    x: Date;
    y: number;
}

interface AreaData {
    x: string;
    y: number;
}

const legendRadius = 7;

export const AreaChart = (props: AreaChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [innerSize, setInnerSize] = useState({ height: 0, width: 0 });
    const [activeDatasets, setActiveDatasets] = useState<Array<string>>(Array);

    const {
        margin, height, width, series, title, xaxis, yaxis, legend, colorsScheme, stroke
    } = props;
    const isTimeSeries = xaxis.datetime;

    // Scalers
    const getTimeXScaleDomain = (axis: 'x' | 'y') => {
        const timeSeries = series as Array<TimeSeries>;

        if (axis === 'x') {
            if (series.length === 0) return [0, 0];
            return extent(timeSeries[0].data.map((d: any): any => d.x)) as [number, number];
        }

        const { min, max } = yaxis;
        const minMax = extent(timeSeries.map(x => x.data).flat(), (d: any) => d.y);
        return [
            min !== undefined ? min : yaxis.startFromZero ? 0 : minMax[0],
            max !== undefined ? max : minMax[1]
        ]
    }
    const timeXScale = scaleTime()
        .domain(getTimeXScaleDomain('x'))
        .range([0, innerSize.width]);

    const timeYScale = scaleLinear()
        .domain(getTimeXScaleDomain('y'))
        .range([innerSize.height, 0])
        .nice();

    const xScale = scaleBand()
        .domain(xaxis.categories || [])
        .rangeRound([0, innerSize.width]);

    const domain = (arr: Array<number>) => {
        const { min, max } = yaxis;
        const minMax = extent(arr) as [number, number];
        return [
            min !== undefined ? min : yaxis.startFromZero ? 0 : Math.round((minMax[0] || 0) / 10) * 10,
            max !== undefined ? max : Math.round(minMax[1] / 10) * 10
        ]
    }

    const yScale = scaleLinear()
        .domain(domain(series.map(s => s.data).flat().map(d => d.y)))
        .range([innerSize.height, 0])
        .nice();

    const colorScale = React.useCallback(scaleOrdinal()
        .domain(series.map(d => d.name))
        .range((colorsScheme || []).concat(schemeSet2)), [series]);

    // Sizing 
    useEffect(() => {
        const { top, left, right, bottom } = margin;
        const innerHeight = height - top - bottom;
        const innerWidth = width - left - right;
        setInnerSize({
            height: innerHeight,
            width: innerWidth
        })
    }, [margin, height, width]);

    // X&Y Axis
    const drawAxis = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const innerHeight = innerSize.height;
        const innerWidth = innerSize.width;

        const strokeColor = "#dadada";

        let _xAxis = undefined;
        let _yAxis = undefined;

        if (isTimeSeries) {
            _xAxis = axisBottom(timeXScale)
                .tickPadding(15);
            _yAxis = axisLeft(timeYScale)
                .tickSize(-innerWidth)
                .tickPadding(15);
        } else {
            _xAxis = axisBottom(xScale)
                .tickPadding(15);
            _yAxis = axisLeft(yScale)
                .tickSize(-innerWidth)
                .tickPadding(15);
        }

        const xAxisGroup = container.select<SVGGElement>('.x-axis')
            .call(_xAxis)
            .attr('transform', `translate(0,${innerHeight})`);

        xAxisGroup
            .selectAll<SVGTextElement, string>(".tick text")
            .call(textWrap, xScale.bandwidth());

        xAxisGroup
            .selectAll<SVGLineElement, unknown>(".tick line")
            .attr('stroke', strokeColor);
        xAxisGroup
            .select('.domain')
            .attr('stroke', strokeColor);

        const yAxisGroup = container.select<SVGGElement>('.y-axis')
            .call(_yAxis);
        yAxisGroup
            .select('.domain').remove();
        yAxisGroup
            .selectAll<SVGLineElement, unknown>(".tick line")
            .attr('stroke', strokeColor);

        if (!isTimeSeries) {
            const rowHeight = innerSize.height / Math.abs(((yScale.ticks().length) - 1));
            yAxisGroup
                .selectAll<SVGLineElement, unknown>(".tick")
                .selectAll('.row').data([0])
                .enter()
                .append('rect')
                .attr('height', rowHeight)
                .attr('width', innerSize.width)
                .attr('class', 'row');
        }

        xAxisGroup.select<SVGTextElement>('.title')
            .text(xaxis.title.text)
            .attr('fill', 'currentColor')
            .attr('y', 50)
            .attr('x', xaxis.title.align === 'middle' ? innerWidth / 2 : xaxis.title.align === 'end' ? innerWidth : 0)
            .attr('text-anchor', xaxis.title.align)
            .attr('font-size', '1.3em')
        yAxisGroup.select<SVGTextElement>('.title')
            .text(yaxis.title.text)
            .attr('fill', 'currentColor')
            .attr('y', -50)
            .attr('x', -(yaxis.title.align === 'middle' ? innerHeight / 2 : yaxis.title.align === 'end' ? innerHeight - 50 : 50))
            .attr('font-size', '1.3em')
            .attr('text-anchor', yaxis.title.align)
            .attr('transform', 'rotate(-90)');


    }, [xScale, yScale, innerSize, xaxis, yaxis, timeXScale, timeYScale, isTimeSeries]);

    // Draw Path
    const drawAreaPath = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const areaGenerator = area()
            .x((d: any) => xScale(d.x) || 0)
            .y0(innerSize.height)
            .y1((d: any) => yScale(d.y));

        if (isTimeSeries) {
            areaGenerator
                .x((d: any) => timeXScale(d.x))
                .y1((d: any) => timeYScale(d.y));
        }

        if (stroke && stroke.curve) {
            areaGenerator.curve(stroke.curve === "step" ? curveStepAfter : curveCatmullRom);
        }

        series.forEach(({ name, data }) => {
            const areaData: any = data;
            const areaGroup = container.selectAll<SVGPathElement, null>(`.${name}`);
            const areaGroupData = areaGroup.data([areaData]);
            const color = colorScale(name);

            areaGroupData
                .enter()
                .append('path')
                .attr('class', name)
                .merge(areaGroupData)
                .attr('d', areaGenerator(areaData) || "")
                .attr('stroke', 'none')
                .attr('fill', color as string)
                .style("fill-opacity", 0.5);
        });
    }, [series, colorScale, xScale, yScale, stroke, timeXScale, timeYScale, isTimeSeries, innerSize.height]);

    // Draw Lines
    const drawLinePath = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        const lineGenerator = line()
            .x((d: any) => xScale(d.x) || 0)
            .y((d: any) => yScale(d.y));

        if (isTimeSeries) {
            lineGenerator
                .x((d: any) => timeXScale(d.x))
                .y((d: any) => timeYScale(d.y));
        }

        if (stroke && stroke.curve) {
            lineGenerator.curve(stroke.curve === "step" ? curveStepAfter : curveCatmullRom);
        }

        series.forEach(s => {
            const { name, data } = s;
            const lineData: any = data;
            const lineGroup = container.selectAll<SVGPathElement, null>(`.${name}`);
            const lineGroupData = lineGroup.data([lineData]);
            const color = colorScale(name);

            lineGroupData
                .enter()
                .append('path')
                .attr('class', name)
                .merge(lineGroupData)
                .attr('d', lineGenerator(lineData) || "")
                .attr('fill', 'none')
                .attr('stroke', color as string)
                .attr('stroke-width', '3')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round');
        });
    }, [series, colorScale, xScale, yScale, stroke, timeXScale, timeYScale, isTimeSeries]);

    // Draw Legends
    const drawLegends = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
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
                const areaGroup = select<SVGGElement, null>('.areaGroup');
                const lineGroup = select<SVGGElement, null>('.lineGroup');
                areaGroup
                    .selectAll('path')
                    .transition().duration(200)
                    .style('opacity', 0.2);
                areaGroup.select(`.${classname}`)
                    .transition().duration(200)
                    .style('opacity', 1);
                lineGroup
                    .selectAll('path')
                    .transition().duration(200)
                    .style('opacity', 0.2);
                lineGroup.select(`.${classname}`)
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
                select<SVGGElement, null>('.areaGroup')
                    .selectAll('path')
                    .transition().duration(200)
                    .style('opacity', 1);
                select<SVGGElement, null>('.lineGroup')
                    .selectAll('path')
                    .transition().duration(200)
                    .style('opacity', 1);
            });
        legendGroup
            .append("circle")
            .attr("class", "dot")
            .attr("cy", (_, i) => i * 25)
            .attr("r", legendRadius)
            .style("fill", d => colorScale(d) as string);

        legendGroup
            .append("text")
            .attr("class", "label")
            .attr("x", 15)
            .attr("y", (_, i) => i * 25)
            .style("fill", (d) => colorScale(d) as string)
            .text((d) => d)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

        legendGroupData
            .exit()
            .remove();
    }, [series, colorScale, legend, margin, height, innerSize, activeDatasets]);

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

    // Draw Circles on Hover Points
    const drawHoverOnIndex = React.useCallback((index: number) => {
        let tooptipTitle = '';
        let xaxisLength = 0;

        const foundOnX = series.reduce((acc: Array<any>, s) => {
            if (activeDatasets.includes(s.name)) {
                if (tooptipTitle === '') {
                    if (isTimeSeries) {
                        const seriesData = s.data as TimeData[];
                        const date = new Date(seriesData[index].x);
                        const mm = date.getMonth() + 1;
                        const dd = date.getDate();
                        tooptipTitle = `${(mm > 9 ? '' : '0') + mm}/${(dd > 9 ? '' : '0') + dd}/${date.getFullYear()}`;
                        xaxisLength = seriesData.length;
                    } else {
                        tooptipTitle = xaxis.categories ? xaxis.categories[index] : "Not Found";
                        xaxisLength = xaxis.categories ? xaxis.categories.length : 0;
                    }
                }
                acc.push({
                    name: s.name,
                    found: s.data[index]
                })
            }
            return acc;
        }, []);
        if (foundOnX.length === 0) return;

        const hoverGroup = select<SVGGElement, unknown>(".hover-group");
        const hoverCirclesGroup = hoverGroup.select<SVGGElement>(".hover-circles");
        const hoverCirclesGroupData = hoverCirclesGroup.selectAll<SVGCircleElement, unknown>("circle").data(foundOnX);

        const offsetX = isTimeSeries ? 0 : xScale.bandwidth() / 2;
        hoverCirclesGroupData
            .enter()
            .append("circle")
            .attr('class', 'hover-circle')
            .attr('r', 6)
            .attr('stroke', '#fff')
            .merge(hoverCirclesGroupData)
            .attr('fill', (d: any) => colorScale(d.name) as string)
            .attr('opacity', 1)
            .transition().duration(100)
            .attr('cx', (d: any) => isTimeSeries ? timeXScale(d.found.x) : (xScale(d.found.x) || 0) + offsetX)
            .attr('cy', (d: any) => { return isTimeSeries ? timeYScale(d.found.y) : yScale(d.found.y) });

        const tooltip = select('.tooltip')
            .style('top', (event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .style('opacity', 1);

        tooltip.select('.header')
            .html(`${tooptipTitle}`);
        const ulList = tooltip.select('.body')
            .select<HTMLUListElement>('ul');

        const _li = ulList.selectAll<HTMLLIElement, unknown>('li').data(foundOnX);
        _li
            .enter()
            .append('li')
            .merge(_li)
            .html((d: any) => `
            <span>
                <div style="background:${colorScale(d.name)}"></div>
                ${d.name}:
            </span> 
            <span>
                ${d.found.y}
            </span>`);
        _li
            .exit()
            .remove();

        if (xaxisLength / 2 <= index) {
            tooltip
                .transition().duration(100)
                .style('left', ((event.pageX - (tooltip.node() as any).clientWidth) - 60) + 'px')
                .style('right', 'unset');
        } else {
            tooltip
                .transition().duration(100)
                .style('left', (event.pageX + 10) + 'px')
                .style('right', 'unset');
        }

    }, [series, xScale, yScale, colorScale, activeDatasets, isTimeSeries, timeXScale, timeYScale, xaxis.categories]);

    // Draw Chart Hover
    const drawChartHover = React.useCallback((container: Selection<SVGGElement, unknown, null, undefined>) => {
        let _seriesData: Array<any> = [];
        if (isTimeSeries && series.length > 0) {
            _seriesData = (series[0].data as TimeData[]).map(x => x.x);
        }

        const bandwidth = isTimeSeries ? innerSize.width / _seriesData.length : xScale.bandwidth();
        const columns = isTimeSeries ? _seriesData : xaxis.categories || [];

        const mouseLine = container.select<SVGLineElement>('.hover-line');
        mouseLine
            .attr('stroke', '#c7c7c7')
            .attr('opacity', 0)
            .attr('y1', 0)
            .attr('stroke-dasharray', 5)
            .attr('y2', innerSize.height);

        const mouseIndexes = container.select<SVGPathElement>('.hover-indexes');
        const indexGroupData = mouseIndexes.selectAll<SVGRectElement, unknown>(".index-group").data(columns);

        const indexGroup = indexGroupData
            .enter()
            .append("rect")
            .merge(indexGroupData)
            .attr("class", 'index-group')
            .attr("x", (_, i) => (i * bandwidth))
            .attr('y', 0)
            .attr('width', bandwidth)
            .attr('opacity', 0)
            .attr('height', innerSize.height)
        indexGroup
            .on('mousemove', (_, index: number) => {
                let x = (index * bandwidth) + (bandwidth / 2);
                if (isTimeSeries) {
                    const halfLen = columns.length / 2;
                    const decrement = (bandwidth / 2) / halfLen;
                    x -= decrement * (halfLen - (index));
                }
                mouseLine
                    .attr('opacity', 1)
                    .attr('x1', x)
                    .attr('x2', x);

                drawHoverOnIndex(index);
            });

    }, [innerSize, xScale, xaxis.categories, drawHoverOnIndex, isTimeSeries, series]);

    // GroupSelections
    useEffect(() => {
        if (svgRef.current === null) return;

        const { left, top } = margin;

        const colsPadding = isTimeSeries ? 0 : xScale.bandwidth() / 2;
        const svg = select(svgRef.current);
        const axisGroup = svg.select<SVGGElement>('.axisGroup').attr('transform', `translate(${left},${top})`);
        const areaGroup = svg.select<SVGGElement>('.areaGroup').attr('transform', `translate(${left + colsPadding},${top})`);
        const hoverGroup = svg.select<SVGGElement>(".hover-group").attr('transform', `translate(${left},${top})`)
            .on('mouseleave', () => {
                hoverGroup
                    .select<SVGLineElement>('.hover-line')
                    .transition().duration(200)
                    .attr('opacity', 0);
                select<SVGGElement, unknown>(".hover-group")
                    .select<SVGGElement>(".hover-circles")
                    .selectAll<SVGCircleElement, unknown>('circle')
                    .transition().duration(200)
                    .attr('opacity', 0);
                select('.tooltip')
                    .transition().duration(200)
                    .style('opacity', 0)
                    .transition().duration(200)
                    .style('display', 'none');
            });
        const titleGroup = svg.select<SVGGElement>('.titleGroup');
        const legendGroup = svg.select<SVGGElement>('.legendGroup');

        drawAxis(axisGroup);
        drawAreaPath(areaGroup);
        drawLegends(legendGroup);
        drawTitle(titleGroup);
        drawChartHover(hoverGroup)


        const lineGroup = svg.select<SVGGElement>('.lineGroup').attr('transform', `translate(${left + colsPadding},${top})`);
        drawLinePath(lineGroup);

    }, [svgRef, margin, drawAxis, drawAreaPath, drawLegends, drawTitle, xScale, drawChartHover, isTimeSeries, drawLinePath]);

    // Initial Active Series
    useEffect(() => {
        setActiveDatasets(series.map(s => s.name));
    }, [series]);

    // InActive Series
    useEffect(() => {
        select<SVGGElement, null>('.areaGroup')
            .selectAll('path')
            .each((_, i, ar) => {
                const thisPath = select(ar[i]);
                if (!activeDatasets.includes(thisPath.attr('class'))) thisPath.remove();
            });
        select<SVGGElement, null>('.lineGroup')
            .selectAll('path')
            .each((_, i, ar) => {
                const thisPath = select(ar[i]);
                if (!activeDatasets.includes(thisPath.attr('class'))) thisPath.remove();
            });
    }, [activeDatasets, series]);

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
                <g className={"lineGroup"} />
                <g className={"areaGroup"} />
                <g className={"hover-group"} >
                    <line className={"hover-line"} />
                    <g className={"hover-indexes"} />
                    <g className={"hover-circles"} />
                </g>
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