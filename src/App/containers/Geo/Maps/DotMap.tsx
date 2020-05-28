import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import { hexgrid } from 'd3-hexgrid';
//@ts-ignore
import worldCities from './data/worldcities.csv';

const height = 600;
const width = 800;

export const DotMap = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    // Projection and path.
    const projection = d3.geoMercator()
        .scale(130)
        .center([0, 0])
        .translate([width / 2, (height / 2) + 100]);
    const geoPath = d3.geoPath().projection(projection);

    React.useEffect(() => {
        if (!svgRef.current) return;
        Promise.all([
            d3.json('https://raw.githubusercontent.com/larsvers/map-store/master/earth-lands-10km.json'),
            d3.csv(worldCities)
        ]).then(([geoData, woldCities]) => {

            //Container.
            const svg = d3.select(svgRef.current);
            const map = svg.select<SVGGElement>('.map');
            const radius = 5;

            const cities = woldCities.map((x: any) => {
                const { city, lng, lat, city_ascii, population } = x;
                const coords = projection([+lng, +lat]);
                return {
                    x: coords ? coords[0] : 0,
                    y: coords ? coords[1] : 0,
                    city,
                    city_ascii,
                    population
                }
            });

            // Produce and configure the hexgrid instance.
            const gridGenerator = hexgrid()
                .extent([width, height])
                .geography(geoData)
                .projection(projection)
                .pathGenerator(geoPath)
                .hexRadius(radius);

            // Hexgrid instanace.
            const { grid } = gridGenerator(cities);

            // const createCirclesPath = () => {
            //     return grid.layout;

            // }

            // console.log(createCirclesPath())

            map.selectAll('.hex')
                .data(grid.layout)
                .enter()
                .append('circle')
                .merge(map.selectAll('.hex'))
                .attr('class', 'hex')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', radius - 1)
                .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)
                .exit()
                .remove();
        });
    }, [svgRef, projection, geoPath]);

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
        stroke: #c9c9c9;
        stroke-width: .1;
    }
    
    .country:hover {
        opacity:0.5;
    }

    .hex{
        fill: #bcbcbc;
        stroke: #fff;
    }
`;