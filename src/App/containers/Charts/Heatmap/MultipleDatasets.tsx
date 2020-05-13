import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import styled from 'styled-components';
import * as d3 from 'd3';
import { getEnumKeyValues, randomNum, getEnumKeys } from 'App/utils';

interface Sales {
    day: DaysOfTheWeek;
    timeValues: {
        value: number;
        time: ActiveTimes;
    }[]
}
enum DaysOfTheWeek {
    Mon,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
    Sun
}
enum ActiveTimes {
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00"
}

export const MultipleDatasets = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [data, setData] = React.useState<Array<Sales>>([]);

    React.useEffect(() => {
        const daysOfTheWeek = getEnumKeyValues<DaysOfTheWeek>(DaysOfTheWeek);
        const activeTimes = getEnumKeyValues<ActiveTimes>(ActiveTimes);
        const salesLog: Array<Sales> = [];

        daysOfTheWeek.forEach((day => {
            const daySales: Sales = {
                day,
                timeValues: []
            };
            activeTimes.forEach(time => {
                daySales.timeValues.push({
                    time,
                    value: randomNum(0, 100)
                })
            });
            salesLog.push(daySales);
        }));

        setData(salesLog);
    }, [])

    React.useEffect(() => {
        if (!svgRef.current) return;

        const daysOfTheWeek = getEnumKeys(DaysOfTheWeek);
        const activeTimes = getEnumKeys(ActiveTimes);
        const formatted = data.reduce((acc: { x: string, y: string, v: number }[], cur) => [
            ...acc,
            ...cur.timeValues.map(x => ({
                x: x.time.toString(),
                v: x.value,
                y: cur.day.toString(),
                yIndex: daysOfTheWeek.indexOf(cur.day.toString())
            }))], []);


        var margin = { top: 30, right: 30, bottom: 30, left: 30 },
            width = 560 - margin.left - margin.right,
            height = 410 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        const heatMapGroup = svg.select('.heatMapGroup')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(activeTimes)
            .padding(0.01);
        heatMapGroup.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        var y = d3.scaleBand()
            .range([height, 0])
            .domain(daysOfTheWeek)
            .padding(0.01);
        heatMapGroup.append("g")
            .call(d3.axisLeft(y));
        // Build color scale
        const groupColorScale = d3.scaleOrdinal()
            .domain(daysOfTheWeek)
            .range(d3.schemeSet2);
        const colorScales = daysOfTheWeek.map(day => {
            const baseColor = groupColorScale(day.toString()) as string;
            return d3.scaleSequential(
                d3.interpolate('#ffffff', baseColor))
                .domain([0, 100])
        });

        //Read the data
        heatMapGroup.selectAll('rect')
            .data(formatted, (d: any) => d.x + ':' + d.y)
            .enter()
            .append("rect")
            .on('mousemove', onMouseHover)
            .on('mouseout', onMouseOut)
            .attr("x", (d: any) => x(d.x)!)
            .attr("y", (d: any) => y(d.y)!)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("cursor", "pointer")
            .style("fill", (d: any) => colorScales[d.yIndex](d.v));

    }, [svgRef, data]);

    const onMouseHover = ({ x, y, v }: any, i: any, arr: any) => {
        d3.select(arr[i])
            .attr('stroke', '#6495ed')
            .attr('stroke-width', 2)

        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`[${x},${y}]: ${v}`);
    }
    const onMouseOut = () => {
        d3.selectAll('.heatMapGroup rect')
            .attr('stroke', 'none')
            .attr('stroke-width', 0)
        d3.select('.tooltip')
            .style('display', 'none');
    }

    return (
        <RouteWrapper
            title={"Multiple Datasets Heatmap Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Multiple-Datasets"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <Svg ref={svgRef}>
                <g className={"heatMapGroup"} />
            </Svg>
            <Tooltip className={'tooltip'} />
        </RouteWrapper>
    )
}
const Svg = styled.svg`
width:560px;
height:410px;
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