import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const height = 600;
const width = 800;

export const Bubble = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [mapData, setMapData] = React.useState<{ csv: any, json: any }>({
        csv: null,
        json: null
    });


    React.useEffect(() => {
        Promise.all([
            d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv'),
            d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
        ]).then(([csvData, topoJSONdata]) => {
            const mapCSVData = d3.map();
            csvData.forEach((d: any) => {
                mapCSVData.set(d.code, +d.pop);
            });
            setMapData({
                json: topoJSONdata,
                csv: mapCSVData
            })
        });
    }, []);

    const sizeScale = React.useCallback(d3.scaleSqrt()
        .domain([0, d3.max(Object.values(mapData.csv || {}), (d: any) => d)])
        .range([1, 30]), [mapData]);

    const projection = d3.geoMercator()
        .scale(100)
        .center([0, 0])
        .translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath()
        .projection(projection);

    const hideTooltip = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    const showTooptip = ({ properties: { name }, total }: any) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`${name}: ${(d3.format("s")(total)).replace('G', 'B')}`);

    };

    React.useEffect(() => {
        const { json, csv } = mapData;
        if (!svgRef.current) return;
        if (!json || !csv) return;

        const svg = d3.select(svgRef.current);
        const map = svg.select<SVGGElement>('.map');

        const data = json.features.map((x: any) => {
            const total = csv.get(x.id) || 0;
            const centroid = projection(d3.geoCentroid(x));

            return {
                ...x,
                total,
                centroid
            }
        });

        const pathData = map.selectAll<SVGPathElement, SVGGElement>('.country')
            .data(data);

        pathData
            .enter()
            .append('path')
            .attr('class', 'country')
            .merge(pathData)
            .attr('d', (d: any) => pathGenerator(d) || "")
            .attr("fill", (d: any) => d.color)
            .on('mouseenter', showTooptip)
            .on('mouseout', hideTooltip)
            .exit()
            .remove();

        const circleData = map.selectAll<SVGCircleElement, SVGGElement>('.circle')
            .data(data);

        circleData
            .enter()
            .append("circle")
            .attr('class', 'circle')
            .attr('cx', (d: any) => d.centroid[0])
            .attr('cy', (d: any) => d.centroid[1])
            .attr("r", (d: any) => sizeScale(d.total))
            .on('mouseenter', showTooptip)
            .on('mouseout', hideTooltip)
            .exit()
            .remove();

        svg.select<SVGGElement>('.legend')
            .attr('transform', `translate(${50},${260})`)
            .call(sizeLegend, {
                sizeScale,
                spacing: 50,
                textOffset: 10,
                numTicks: 5
            })

    }, [svgRef, mapData, pathGenerator, sizeScale, projection]);

    return (
        <Wrapper>
            <svg width={width} height={height} ref={svgRef}>
                <Map className={'map'} />
                <g className={'legend'} />
            </svg>
            <Tooltip className={'tooltip'} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width:800px;
    margin:0 auto;
    

    .circle{
        stroke: #d59b9b;
        fill: #d66767;
        cursor: pointer;
        fill-opacity:.4;
    }
    .circle:hover{
        fill-opacity:.6;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    display: none;
    border-radius: 3px;
    box-shadow: 1px 6px 10px 0px #0003;
    padding: 6px;
    background: #505050;
    color: #eeeeee;
`;

const Map = styled.g`
    .country {
        cursor:pointer;
        stroke: #dfdfdf;
        fill:#f5f5f5;
    }
    
    .country:hover {
        stroke: #d3d3d3;
        fill: #e5e5e5;
    }
`;

const sizeLegend = (selection: any, props: any) => {
    const {
        sizeScale,
        spacing,
        textOffset,
        numTicks
    } = props;

    const ticks = sizeScale.ticks(numTicks)
        .filter((d: any) => d !== 0)
        .reverse();

    const groups = selection.selectAll('g').data(ticks);
    const groupsEnter = groups
        .enter()
        .append('g')
        .attr('class', 'tick');
    groupsEnter
        .merge(groups)
        .attr('transform', (d: any, i: number) => `translate(0, ${(i * spacing) + (i * sizeScale(d))})`);

    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('class', 'circle')
        .attr('r', sizeScale);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .text((d: any) => d3.format("s")(d).replace('G', 'B'))
        .attr('dy', '0.32em')
        .attr('x', (d: any, i: number) => sizeScale(d) + textOffset);
}