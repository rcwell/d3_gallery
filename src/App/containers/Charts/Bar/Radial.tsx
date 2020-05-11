import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import * as d3 from 'd3';
import styled from 'styled-components';

export const Radial = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => {
        if (!svgRef.current) return;

        const width = 800,
            height = 500,
            chartInnerRadius = 100,
            chartOuterRadius = (height / 2) - chartInnerRadius;
        const color = d3.scaleOrdinal(d3.schemeSet2);

        const svg = d3.select(svgRef.current);

        const svgGroup = svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const PI = Math.PI,
            arcMinRadius = 10,
            arcPadding = 5;

        const data = [
            {
                name: "Jan", value: 432
            },
            {
                name: "Feb", value: 340
            },
            {
                name: "Mar", value: 382
            },
            {
                name: "Apr", value: 398
            },
            {
                name: "May", value: 410
            }
        ]

        let scale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)! * 1.1])
            .range([0, 2 * PI]);

        let keys = data.map((d, i) => d.name);
        //number of arcs
        const numArcs = keys.length;
        const arcWidth = (chartOuterRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

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

        const innerLabelGroup = svgGroup.append('g')
            .attr('class', 'info-label');
        const totalValues = data.reduce((total: number, curr) => total + curr.value, 0);

        const innerLabelName = innerLabelGroup.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 600)
            .attr('y', -20)
            .text(`Total`);
        const innerLabelValue = innerLabelGroup.append('text')
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

        let arc = d3.arc()
            .innerRadius((d, i) => getInnerRadius(i))
            .outerRadius((d, i) => getOuterRadius(i))
            .startAngle(0)
            .cornerRadius(arcWidth / 2)
            .endAngle((d: any, i) => scale(d))//check

        let radialAxis = svgGroup.append('g')
            .attr('class', 'r axis')
            .selectAll('g')
            .data(data)
            .enter().append('g');

        const backgroundArcs = d3.arc()
            .innerRadius((_, i) => getInnerRadius(i))
            .outerRadius((_, i) => getOuterRadius(i))
            .startAngle(0)
            .cornerRadius(arcWidth / 2)
            .endAngle(2 * Math.PI)

        radialAxis.append('path')
            .attr('d', backgroundArcs as any)
            .attr('fill', '#ececec');

        //data arcs
        let arcs = svgGroup.append('g')
            .attr('class', 'data')
            .selectAll('path')
            .data(data)
            .enter().append('path')
            .attr('class', 'arc')
            .style('fill', (d, i) => color(i.toString()))


        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

        arcs.on('mousemove', showValue)
        arcs.on('mouseout', hideValue);
    }, [svgRef]);



    return (
        <RouteWrapper
            title={"Radial Bar Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Radial"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <SVG ref={svgRef} />
        </RouteWrapper>
    )
}

const SVG = styled.svg`
    width:800px;
    height:500px;

    & path.arc {
        opacity: 0.9;
        transition: opacity 0.5s;
    }
    
    & path.arc:hover {
        opacity: 0.7;
    }
    
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
`;