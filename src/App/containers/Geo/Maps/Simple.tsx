import React from 'react';
import { feature } from 'topojson-client';
import * as d3 from 'd3';
import styled from 'styled-components';

export const SimpleWorldMap = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [slider, setSlider] = React.useState(250);
    const [mapData, setMapData] = React.useState<{ tsv: any, json: any }>({
        tsv: null,
        json: null
    });

    React.useEffect(() => {
        Promise.all([
            d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/110m.tsv'),
            d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
        ]).then(([tsvData, topoJSONdata]) => {

            const countryName = tsvData.reduce((accumulator: any, d: any) => {
                accumulator[d.iso_n3] = d.name;
                return accumulator;
            }, {});
            const countries: any = feature(topoJSONdata, topoJSONdata.objects.countries);
            setMapData({
                tsv: countryName,
                json: countries
            })
        });
    }, []);

    const pathGenerator = React.useCallback(d3.geoPath()
        .projection(
            d3.geoNaturalEarth1()
                .rotate([slider, 0, 0])
                .fitExtent([[0, 0], [800, 400]], mapData.json)),
        [slider, mapData.json]);

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
        const { tsv, json } = mapData;
        if (!svgRef.current) return;
        if (tsv === null && json === null) return;

        const svg = d3.select(svgRef.current);
        const map = svg.select<SVGGElement>('.map');

        map.select<SVGPathElement>('.water')
            .attr('d', pathGenerator({ type: 'Sphere' }) || '');

        const pathData = map.selectAll<SVGPathElement, SVGGElement>('.country')
            .data(json.features);
        pathData
            .enter()
            .append('path')
            .attr('class', 'country')
            .merge(pathData)
            .attr('d', (d: any) => pathGenerator(d) || '')
            .on('mouseenter', (d: any) => showTooptip(tsv[d.id]))
            .on('mouseout', hideTooltip)
            .exit()
            .remove();

    }, [svgRef, mapData, pathGenerator]);

    return (
        <Wrapper>
            <svg width="800" height="500" ref={svgRef}>
                <Map className={'map'} >
                    <path className={'water'} />
                </Map>
            </svg>
            <Tooltip className={'tooltip'} />
            <Slider
                type="range"
                min="0"
                max={360}
                value={slider}
                onChange={e => {
                    setSlider(parseInt(e.target.value))
                }} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    width:800px;
    margin:0 auto;
`;

const Slider = styled.input`
    -webkit-appearance: none;
    width:100%;
    height: 5px;
    background: #384259;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius:5px;

    &:hover{
    opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: #90cca2;
        cursor: pointer;
    }
`;

const Tooltip = styled.div`
    position: absolute;
    display: none;
    border-radius: 3px;
    box-shadow: 1px 6px 10px 0px #0003;
    padding: 6px;
`;

const Map = styled.g`
    .water {
        fill: #4c6797;
    }
  
    .country {
        cursor:pointer;
        fill: #90cca2;
        stroke: #5b966d;
        stroke-opacity: 0.3;
    }
    
    .country:hover {
        fill: #c8ffd8;
    }
`;