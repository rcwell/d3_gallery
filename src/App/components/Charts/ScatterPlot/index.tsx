import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { defaultB64 } from './defaultb64';

interface IScatterPlot {
    width: number,
    height: number,
    series: Array<ScatterPlotData>,
    xaxis: {
        title: AxisTitle,
        offset?: Offset
    },
    yaxis: {
        title: AxisTitle,
        offset?: Offset
    },
    circleRadius?: {
        default: number,
        scaling?: {
            min: number,
            max: number
        }
    }
    bubble?: boolean,
    imageFilled?: boolean,
    imageFills?: {
        key: string,
        url: string,
    }[]
}
interface ScatterPlotData {
    x: number,
    y: number,
    imageKey?: string
}
interface Offset {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
}
interface AxisTitle {
    text: string,
    align: 'start' | 'middle' | 'end',
    alignToParentSvg?: Boolean
}
interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export const ScatterPlot = (props: IScatterPlot) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    const {
        xaxis,
        yaxis,
        series,
        width,
        height,
        bubble,
        imageFilled,
        circleRadius,
        imageFills
    } = props;

    const hideTooltip = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    const showTooptip = React.useCallback((d: ScatterPlotData) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`${yaxis.title.text}: ${d.x} x ${xaxis.title.text}: ${d.x}`);
    }, [yaxis, xaxis]);

    React.useEffect(() => {
        if (!svgRef.current) return

        const _svg = d3.select(svgRef.current);

        /** Sizing **/
        const margin: Margin = { top: 60, right: 20, bottom: 60, left: 100 };
        const innerWidth = width - (margin.left + margin.right);
        const innerHeight = height - (margin.top + margin.bottom);
        const rad = circleRadius?.default || 10;
        const minCircleRadius = circleRadius?.scaling ? circleRadius.scaling.min : 10;
        const maxCircleRadius = circleRadius?.scaling ? circleRadius.scaling.max : 30;

        /**  Value Scalers **/
        const xDomain = (d3.extent(series, d => d.x) as [number, number]);
        const yDomain = (d3.extent(series, d => d.y) as [number, number]);

        const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([0, innerWidth])
            .nice();
        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([0, innerHeight])
            .nice();

        /**  Circles Group **/
        const circleGroup = _svg.selectAll<SVGGElement, null>('.circle-group').data([0]);
        circleGroup
            .enter()
            .append('g')
            .attr('class', `circle-group ${bubble ? 'bubbles' : imageFilled ? 'icons' : ''}`)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const axesMultiplier = (d: ScatterPlotData) => d.x * d.y;
        const vals = series.reduce((vals: Array<any>, curr) => [
            ...vals,
            axesMultiplier(curr)
        ], []);
        const radiusScale = d3.scaleLinear()
            .domain(d3.extent(vals) as [number, number])
            .range([minCircleRadius, maxCircleRadius]);

        if (imageFilled) {
            const images = circleGroup.selectAll<SVGImageElement, null>('image').data(series);
            const imageNode = images
                .enter()
                .append("image")
                .attr("xlink:href", d => {
                    const found = imageFills?.find(f => f.key === d.imageKey);
                    return found ? found.url : defaultB64;
                })
                .attr("y", d => (yScale(d.y) || 0) - rad)
                .attr("x", d => (xScale(d.x)) - rad)
                .attr("height", 0)
                .attr("width", 0);

            imageNode
                .merge(images)
                .on('mousemove', showTooptip)
                .on('mouseout', hideTooltip)
                .transition()
                .duration(1000)
                .attr("y", d => (yScale(d.y) || 0) - rad)
                .attr("x", d => (xScale(d.x)) - rad)
                .attr("height", d => bubble ? radiusScale(axesMultiplier(d)) : rad * 2)
                .attr("width", d => bubble ? radiusScale(axesMultiplier(d)) : rad * 2);

            images
                .exit()
                .transition()
                .duration(1000)
                .attr("height", 0)
                .attr("width", 0)
                .remove();
        } else {
            const circles = circleGroup.selectAll<SVGCircleElement, null>('circle').data(series);
            const circleNode = circles
                .enter()
                .append('circle')
                .attr('cy', d => yScale(d.y) || 0)
                .attr('cx', d => xScale(d.x))
                .attr('r', 0);

            circleNode
                .merge(circles)
                .on('mousemove', showTooptip)
                .on('mouseout', hideTooltip)
                .transition()
                .duration(1000)
                .attr('cy', d => yScale(d.y) || 0)
                .attr('cx', d => xScale(d.x))
                .attr('r', d => bubble ? radiusScale(axesMultiplier(d)) : rad);

            circles
                .exit()
                .transition()
                .duration(1000)
                .attr('r', 0)
                .remove();
        }

        /** Axes **/
        const formatter: any = (n: number) =>
            d3.format('.3s')(n)
                .replace('G', 'B');

        const xAxis = d3.axisBottom(xScale)
            .tickFormat(formatter)
            .tickSize(-innerHeight)
            .tickPadding(15);

        const yAxis = d3.axisLeft(yScale)
            .tickFormat(formatter)
            .tickSize(-innerWidth)
            .tickPadding(15);

        const axisGroup = _svg.select<SVGGElement>(".axisGroup")
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const yAxisGroup = axisGroup.select<SVGGElement>('.y-axis')
            .call(yAxis)
            .attr('font-size', '0.9em');

        const xAxisGroup = axisGroup.select('.x-axis')
            .call(xAxis as any)
            .attr('transform', `translate(0,${innerHeight})`)
            .attr('font-size', '0.9em')

        // Add axis label
        const yAxisTextLabel = yAxisGroup.selectAll<SVGTextElement, null>('.y-axis-label').data([0]);
        const xAxisTextLabel = xAxisGroup.selectAll<SVGTextElement, null>('.x-axis-label').data([0]);
        yAxisTextLabel
            .enter()
            .append('text')
            .attr('class', 'y-axis-label')
            .attr('fill', 'currentColor')
            .attr('y', -80)
            .attr('x', -innerHeight / 2)
            .attr('font-size', '1.3em')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(yaxis.title.text)
            .merge(yAxisTextLabel)
            .text(yaxis.title.text);
        xAxisTextLabel
            .enter()
            .append('text')
            .attr('class', 'x-axis-label')
            .attr('fill', 'currentColor')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .attr('font-size', '1.3em')
            .attr('text-anchor', 'middle')
            .text(xaxis.title.text)
            .merge(xAxisTextLabel)
            .text(xaxis.title.text);

        axisGroup.selectAll('path')
            .attr('stroke', "#636363");

        axisGroup
            .selectAll('.domain')
            .remove();

        /** Title **/
        const _titleGroup = _svg.selectAll<SVGGElement, null>('.title-group').data([0]);
        _titleGroup
            .enter()
            .append('g')
            .attr('class', 'title-group')
            .attr('transform', `translate(${margin.left + (innerWidth / 2)},${margin.top - 20})`);

        const titleText = _titleGroup.selectAll<SVGTextElement, null>('.title').data([0]);
        titleText
            .enter()
            .append('text')
            .attr('class', 'title')
            .attr('font-size', '2em')
            .attr('text-anchor', 'middle')
            .merge(titleText)
            .text(`Cars: ${xaxis.title.text} x ${yaxis.title.text}`);
    }, [series, xaxis, yaxis, showTooptip, bubble, width, height, circleRadius, imageFilled, imageFills]);

    return (
        <>
            <Svg width={width} height={height} ref={svgRef} >
                <g className={"axisGroup"}>
                    <g className={"x-axis"} />
                    <g className={"y-axis"} />
                </g>
            </Svg>
            <Tooltip className={'tooltip'} />
        </>
    )
}

const Tooltip = styled.div`
  position: absolute;
  display: none;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  box-shadow: -3px 3px 15px #888;
  color: white;
  padding: 6px;
`;

const Svg = styled.svg`
    > .circle-group.bubbles > circle {
        fill:cornflowerblue;
        cursor:pointer;
        transition:opacity .2s ease-in-out;
        stroke: white;
        stroke-width: 2px;
        opacity:0.8;
    }
`;