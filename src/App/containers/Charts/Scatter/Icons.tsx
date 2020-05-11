
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import * as d3 from 'd3';
import { Dropdown } from 'App/components/Dropdown'
import styled from 'styled-components';

interface Car {
    mpg: number;
    cylinders: number;
    displacement: number;
    horsepower: number;
    weight: number;
    acceleration: number;
    year: number;
    origin: string;
    name: string;
}

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

const spidey = 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png';
const hulk = 'http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png';

export const Icons = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [data, setData] = React.useState<Array<Car>>(Array);
    const [isDataLoaded, setIsDataLoaded] = React.useState(Boolean);
    const [y, setY] = React.useState({
        key: 'weight',
        displayName: 'Weight'
    });
    const [x, setX] = React.useState({
        key: 'horsepower',
        displayName: 'Horsepower'
    });

    React.useEffect(() => {
        d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then((data: any) => {
            setData(data.slice(0, 50).map((d: Car) => ({
                mpg: +d.mpg,
                cylinders: +d.cylinders,
                displacement: +d.displacement,
                horsepower: +d.horsepower,
                weight: +d.weight,
                acceleration: +d.acceleration,
                year: +d.year
            })));
            setIsDataLoaded(true);
        });
    }, []);


    const hideTooltip = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    const showTooptip = React.useCallback((d: Car) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`${y.displayName}: ${d[y.key as keyof Car]} x ${x.displayName}: ${d[x.key as keyof Car]}`);
    }, [x, y]);

    React.useEffect(() => {
        if (!svgRef.current) return

        const _svg = d3.select(svgRef.current);

        /** Sizing **/
        const size = {
            width: +_svg.attr('width'),
            height: +_svg.attr('height')
        };
        const margin: Margin = { top: 60, right: 20, bottom: 60, left: 100 };
        const innerWidth = size.width - (margin.left + margin.right);
        const innerHeight = size.height - (margin.top + margin.bottom);
        const circleRadius = 20;

        /**  Value Accessors **/
        const xValue = (d: any) => d[x.key];
        const xAxisLabel = x.displayName;
        const yValue = (d: any) => d[y.key];
        const yAxisLabel = y.displayName;

        /**  Value Scalers **/
        const xDomain = (d3.extent(data, xValue) as [number, number]);
        const yDomain = (d3.extent(data, yValue) as [number, number]);

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
            .attr('class', 'circle-group')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const images = circleGroup.selectAll<SVGImageElement, null>('image')
            .data(y.key !== "" && x.key !== "" ? data : []);


        const imageNode = images
            .enter()
            .append("image")
            .attr("xlink:href", (_, i) => i % 2 === 0 ? spidey : hulk)
            .attr("y", d => (yScale(yValue(d)) || 0) - circleRadius)
            .attr("x", d => (xScale(xValue(d))) - circleRadius)
            .attr("height", 0)
            .attr("width", 0);

        imageNode
            .merge(images)
            .on('mousemove', showTooptip)
            .on('mouseout', hideTooltip)
            .transition()
            .duration(1000)
            .attr("y", d => (yScale(yValue(d)) || 0) - circleRadius)
            .attr("x", d => (xScale(xValue(d))) - circleRadius)
            .attr("height", circleRadius * 2)
            .attr("width", circleRadius * 2);

        images
            .exit()
            .transition()
            .duration(1000)
            .attr("height", 0)
            .attr("width", 0)
            .remove();
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
            .merge(yAxisTextLabel)
            .text(yAxisLabel);
        xAxisTextLabel
            .enter()
            .append('text')
            .text(xAxisLabel)
            .attr('class', 'x-axis-label')
            .attr('fill', 'currentColor')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .attr('font-size', '1.3em')
            .attr('text-anchor', 'middle')
            .merge(xAxisTextLabel)
            .text(xAxisLabel);

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
            .text(`Cars: ${y.displayName || "Select option"} x ${x.displayName || "Select option"}`);
    }, [data, x, y, showTooptip]);

    return (
        <RouteWrapper
            title={"Icons Scatter Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Icons"
            }]}
            description={"Lorem ipsum dolor sith amet"}>


            <Container>
                <AxesSelector>
                    <Dropdown
                        onChange={setY}
                        options={[
                            { displayName: "Mpg", key: "mpg" },
                            { displayName: "Cylinders", key: "cylinders" },
                            { displayName: "Displacement", key: "displacement" },
                            { displayName: "Horsepower", key: "horsepower" },
                            { displayName: "Weight", key: "weight" },
                            { displayName: "Acceleration", key: "acceleration" },
                            { displayName: "Year", key: "year" }
                        ]}
                        value={y}
                        placeholder={"Select one"}
                    />
                    <div>x</div>
                    <Dropdown
                        onChange={setX}
                        options={[
                            { displayName: "Mpg", key: "mpg" },
                            { displayName: "Cylinders", key: "cylinders" },
                            { displayName: "Displacement", key: "displacement" },
                            { displayName: "Horsepower", key: "horsepower" },
                            { displayName: "Weight", key: "weight" },
                            { displayName: "Acceleration", key: "acceleration" },
                            { displayName: "Year", key: "year" }
                        ]}
                        value={x}
                        placeholder={"Select one"}
                    />
                </AxesSelector>
                <svg width={800} height={500} opacity={isDataLoaded ? 1 : 0} ref={svgRef} >
                    <g className={"axisGroup"}>
                        <g className={"x-axis"} />
                        <g className={"y-axis"} />
                    </g>
                </svg>
                <Tooltip className={'tooltip'} />
                {!isDataLoaded &&
                    <div style={{
                        position: "absolute",
                        top: 0,
                        bottom: '0',
                        left: '0',
                        right: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        Loading...
                </div>
                }
            </Container>
        </RouteWrapper>
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

const Container = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

& image {
    background:cornflowerblue;
    opacity:0.8;
    cursor:pointer;
    transition:opacity .2s ease-in-out;
}
& image:hover {
    opacity: 1;
}
`;

const AxesSelector = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;

    > div{
        margin: 0 10px;
    }
`;
