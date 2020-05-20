
import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

interface IHeatMap {
    width: number,
    height: number,
    margin: Margin,
    series: Array<HeatmapData>,
    colorScale: ColorScale,
    xaxis: {
        title: AxisTitle,
        categories: Array<string>
    },
    yaxis: {
        title: AxisTitle,
        categories: Array<string>
    },
    thresholdScale?: {
        colors: Array<string>,
        range: Array<number>
    }
}
interface HeatmapData {
    x: string,
    y: string,
    value: number,
    dataSetName?: string
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
interface ColorScale {
    startColor: string;
    endColor: string;
    range: {
        min: number,
        max: number
    };
}

export const HeatMap = (props: IHeatMap) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    const {
        series,
        margin,
        width,
        height,
        xaxis,
        yaxis,
        colorScale,
        thresholdScale
    } = props;

    React.useEffect(() => {
        if (!svgRef.current) return;

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        const heatMapGroup = svg.select('.heatMapGroup')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const datasets = series.reduce((acc: Array<string>, { dataSetName }) =>
            dataSetName
                ? acc.includes(dataSetName)
                    ? acc
                    : [...acc, dataSetName]
                : acc, []);

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, innerWidth])
            .domain(xaxis.categories)
            .padding(.1);
        heatMapGroup.append("g")
            .attr("transform", "translate(0," + innerHeight + ")")
            .call(d3.axisBottom(x))

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([innerHeight, 0])
            .domain(yaxis.categories)
            .padding(0.1);
        heatMapGroup.append("g")
            .call(d3.axisLeft(y));

        // Build color scale
        let colorsScalers: any = {};
        let thresholdScaler: any = null;

        const color = d3.scaleSequential(
            d3.interpolate(colorScale.startColor, colorScale.endColor))
            .domain([colorScale.range.min, colorScale.range.max]);

        if (thresholdScale) {
            thresholdScaler = d3.scaleThreshold<number, string>()
                .domain(thresholdScale.range)
                .range(thresholdScale.colors);
        }

        const multipleDatasets = datasets.length > 0 && !thresholdScale;
        if (multipleDatasets) {
            const dataSetColor = d3.scaleOrdinal()
                .domain(datasets)
                .range(d3.schemeSet2);
            datasets.forEach(n => {
                colorsScalers = {
                    ...colorsScalers,
                    [n]: d3.scaleSequential(
                        d3.interpolate(colorScale.startColor, dataSetColor(n) as string))
                        .domain([colorScale.range.min, colorScale.range.max])
                }
            })
        };

        //Read the data
        heatMapGroup.selectAll<SVGRectElement, unknown>('rect')
            .data(series)
            .enter()
            .append("rect")
            .on('mousemove', onMouseHover)
            .on('mouseout', onMouseOut)
            .attr("x", d => x(d.x) || 0)
            .attr("y", d => y(d.y) || 0)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("cursor", "pointer")
            .style("fill", d => {
                if (thresholdScale) {
                    return thresholdScaler(d.value);
                }
                if (multipleDatasets) {
                    return colorsScalers[d.dataSetName!](d.value);
                }
                return color(d.value)
            });

        // Draw Legends 
        // return;
        // const keys = [0, 1, 2, 3, 4];
        // const legendGroupContainer = svg.select<SVGGElement>('.legendGroup')
        //     .attr('transform', `translate(${width - 32},${margin.top + 14})`);
        // const legendGroupData = legendGroupContainer.selectAll<SVGGElement, unknown>(".legend").data(keys);
        // const legendGroup = legendGroupData
        //     .enter()
        //     .append("g")
        //     .merge(legendGroupData)
        //     .attr("class", 'legend');
        // legendGroup
        //     .append("circle")
        //     .attr("class", "dot")
        //     .attr("cy", (_, i) => i * 25)
        //     .attr("r", 7)
        //     .attr("stroke", colorScale.endColor)
        //     .style("fill", d => color(d) as string);
        // legendGroup
        //     .append("text")
        //     .attr("class", "label")
        //     .attr("x", 15)
        //     .attr("y", (_, i) => i * 25)
        //     .style("fill", colorScale.endColor)
        //     .text((d) => d)
        //     .attr("text-anchor", "left")
        //     .style("alignment-baseline", "middle");

    }, [svgRef, height, width, margin, series, xaxis, yaxis, colorScale, thresholdScale]);

    const onMouseHover = ({ x, y, value }: HeatmapData) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`[${x}, ${y}]: ${value}`);
    }
    const onMouseOut = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    return (
        <>
            <Svg ref={svgRef} width={width} height={height}>
                <g className={"heatMapGroup"} />
                <g className={"legendGroup"} />
            </Svg>
            <Tooltip className={'tooltip'} />
        </>
    )
}

const Svg = styled.svg`
 > .heatMapGroup > rect:hover{
     opacity:0.5;
 }
`;

const Tooltip = styled.div`
  position: absolute;
  display: none;
  border-radius: 3px;
  box-shadow: 1px 6px 10px 0px #0003;
  padding: 6px;
  color:#fff;
  background: rgba(0, 0, 0, 0.6);
`;