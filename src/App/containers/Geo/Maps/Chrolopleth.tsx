import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const height = 600;
const width = 800;

export const Chrolopleth = () => {
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


    const colorScale = d3.scaleThreshold<number, string>()
        .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
        .range(d3.schemeBlues[7]);
    const fontColorScale = d3.scaleThreshold<number, string>()
        .domain([10000000, 30000000, 100000000, 500000000])
        .range(['#5a5a5a', '#eeeeee']);

    const pathGenerator = d3.geoPath()
        .projection(d3.geoMercator()
            .scale(100)
            .center([0, 0])
            .translate([width / 2, height / 2]));

    const hideTooltip = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    const showTooptip = React.useCallback(({ properties: { name }, total, color }: any) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .style('background', color)
            .style('color', fontColorScale(total))
            .html(`${name}: ${d3.format("s")(total)}`);

    }, [fontColorScale]);

    React.useEffect(() => {
        const { json, csv } = mapData;
        if (!svgRef.current) return;
        if (!json || !csv) return;

        const svg = d3.select(svgRef.current);
        const map = svg.select<SVGGElement>('.map');

        const pathData = map.selectAll<SVGPathElement, SVGGElement>('.country')
            .data(json.features.map((x: any) => {
                const total = csv.get(x.id) || 0;
                return {
                    ...x,
                    total,
                    color: colorScale(total)
                }
            }));

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

    }, [svgRef, mapData, colorScale, pathGenerator, showTooptip]);

    return (
        <Wrapper>
            <svg width={width} height={height} ref={svgRef}>
                <Map className={'map'} />
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
`;

const Map = styled.g`
    .country {
        cursor:pointer;
        opacity:1;
    }
    
    .country:hover {
        opacity:0.5;
    }
`;