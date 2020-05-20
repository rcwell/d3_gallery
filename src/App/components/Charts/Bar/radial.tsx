import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

interface Props {
    width: number;
    height: number;
    data: Array<Data>;
    colorsScheme?: Array<string>;
}
interface Data {
    name: string,
    value: number
}

export const Radial = (props: Props) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const { width, height, data, colorsScheme } = props;

    React.useEffect(() => {
        if (!svgRef.current) return;

        const PI = Math.PI;
        const arcMinRadius = 10;
        const arcPadding = 5;
        const chartInnerRadius = 100;
        const chartOuterRadius = (height / 2) - chartInnerRadius;

        const color = d3.scaleOrdinal([...(colorsScheme || []), ...d3.schemeSet2]);
        const svg = d3.select(svgRef.current);

        const svgGroup = svg.select<SVGGElement>('.radialGroup').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const scale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)! * 1.1])
            .range([0, 2 * PI]);

        const keys = data.map((d, i) => d.name);
        const totalValues = data.reduce((total: number, curr) => total + curr.value, 0);
        const numArcs = keys.length;
        const arcWidth = (chartOuterRadius - arcMinRadius - numArcs * arcPadding) / numArcs;
        const arc = d3.arc()
            .innerRadius((d, i) => getInnerRadius(i))
            .outerRadius((d, i) => getOuterRadius(i))
            .startAngle(0)
            .cornerRadius(arcWidth / 2)
            .endAngle((d: any, i) => scale(d))//check

        const getInnerRadius = (index: number) => {
            return chartInnerRadius + arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
        }
        const getOuterRadius = (index: number) => {
            return getInnerRadius(index) + arcWidth;
        }
        const arcTween = (d: { value: number, name: string }, i: number) => {
            let interpolate = d3.interpolate(0, d.value);
            return (t: any) => arc(interpolate(t) as any, i)!;
        }
        const innerLabelGroup = svgGroup.select<SVGGElement>('.info-label');

        const innerLabelName = innerLabelGroup.select<SVGTextElement>('.name')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 600)
            .attr('y', -20)
            .text('Total');
        const innerLabelValue = innerLabelGroup.select<SVGTextElement>('.value')
            .attr('y', 20)
            .attr('text-anchor', 'middle')
            .text(totalValues);

        const hideValue = () => {
            innerLabelName.text(`Total`);
            innerLabelValue.text(totalValues)
        }

        const showValue = (d: any, i: number) => {
            innerLabelName.text(d.name)
                .style('fill', color(i.toString()));;
            innerLabelValue.text(d.value);
        }

        const backgroundArcs = d3.arc()
            .innerRadius((_, i) => getInnerRadius(i))
            .outerRadius((_, i) => getOuterRadius(i))
            .startAngle(0)
            .cornerRadius(arcWidth / 2)
            .endAngle(2 * Math.PI)

        let radialAxis = svgGroup.select('.r_axis')
            .selectAll('g')
            .data(data)
            .enter().append('g');
        radialAxis.append('path')
            .attr('d', backgroundArcs as any)
            .attr('fill', '#ececec');

        //data arcs
        let arcs = svgGroup.select<SVGGElement>('.data')
            .selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .attr('class', 'arc')
            .style('fill', (_, i) => color(i.toString()))

        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

        arcs.on('mousemove', showValue);
        arcs.on('mouseout', hideValue);

    }, [height, width, data, colorsScheme]);

    return (
        <>
            <SVG width={width} height={height} ref={svgRef}>
                <g className={"radialGroup"} >
                    <g className={'info-label'}>
                        <text className={'name'} />
                        <text className={'value'} />
                    </g>
                    <g className={'r_axis'} />
                    <g className={'data'} />
                </g>
            </SVG>
        </>
    )
}

const SVG = styled.svg`
    & .axis line,
    & .axis circle {
        stroke: #cccccc;
        stroke-width: 1px
    }
    
    & .axis circle {
        fill: none;
    }
    
    & .r.axis text {
        text-anchor: end
    }
    & .data path{
        cursor:pointer;
        transition: opacity 0.5s;

        &:hover{
            opacity:0.5;
        }
    }
`;