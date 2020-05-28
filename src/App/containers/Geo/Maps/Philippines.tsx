import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import ph from './data/phmap.json';

export const Philippines = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [zoom, setZoom] = React.useState(1);

    const zoomScale = d3.scaleLinear()
        .domain([1, 100])
        .range([1700, 17000]);

    const strokeScale = d3.scaleLinear()
        .domain([1, 100])
        .range([0.3, 0.05]);

    const pathGenerator = d3.geoPath().projection(d3.geoMercator()
        .rotate([-122.427150, 0])
        .center([0, 11])
        .scale(zoomScale(zoom))
        .translate([400, 300]));

    const hideTooltip = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    const showTooptip = (name: string) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .style('background', '#6495ed')
            .html(name);
    };

    React.useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const map = svg.select<SVGGElement>('.map');

        const pathData = map.selectAll<SVGPathElement, SVGGElement>('.country')
            .data(ph.features);
        const zooming = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([1, 100])
            .on('zoom', () => {
                const { k, x, y } = d3.event.transform;
                setZoom(k);
                svg.select('.map')
                    .transition().duration(k === zoom ? 0 : 300)
                    .attr('transform', `translate(${x},${y}) scale(${k})`);
                svg.select('.map')
                    .selectAll<SVGPathElement, unknown>('.country')
                    .attr('stroke-width', strokeScale(zoom))
            });

        zooming.translateBy(svg, 0, 0)
        svg.call(zooming);

        pathData
            .enter()
            .append('path')
            .attr('class', 'country')
            .merge(pathData)
            .attr('d', (d: any) => pathGenerator(d) || '')
            .on('mouseenter', (d: any) => showTooptip(d.properties.name))
            .on('mouseout', hideTooltip)
            .exit()
            .remove();

    }, [svgRef, pathGenerator, strokeScale, zoom]);

    return (
        <Wrapper>
            <svg width="800" height="500" ref={svgRef}>
                <Map className={'map'} transform={'translate(0,0)'} />
            </svg>
            <Tooltip className={'tooltip'} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width:800px;
    margin:0 auto;
`;

const Tooltip = styled.div`
    position: absolute;
    display: none;
    border-radius: 3px;
    box-shadow: 1px 6px 10px 0px #0003;
    padding: 6px;
    color: #fff;
    text-shadow: 0 1px 8px black;
`;

const Map = styled.g`
    .country {
        cursor:pointer;
        fill: #90cca2;
        stroke: #5b966d;
    }
    
    .country:hover {
        fill: #c8ffd8;
    }
`;