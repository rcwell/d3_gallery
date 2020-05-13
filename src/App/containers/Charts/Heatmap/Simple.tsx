
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import styled from 'styled-components';
import * as d3 from 'd3';

const data = [{ group: "A", variable: "v1", value: "30" }, { group: "A", variable: "v2", value: "95" }, { group: "A", variable: "v3", value: "22" }, { group: "A", variable: "v4", value: "14" }, { group: "A", variable: "v5", value: "59" }, { group: "A", variable: "v6", value: "52" }, { group: "A", variable: "v7", value: "88" }, { group: "A", variable: "v8", value: "20" }, { group: "A", variable: "v9", value: "99" }, { group: "A", variable: "v10", value: "66" }, { group: "B", variable: "v1", value: "37" }, { group: "B", variable: "v2", value: "50" }, { group: "B", variable: "v3", value: "81" }, { group: "B", variable: "v4", value: "79" }, { group: "B", variable: "v5", value: "84" }, { group: "B", variable: "v6", value: "91" }, { group: "B", variable: "v7", value: "82" }, { group: "B", variable: "v8", value: "89" }, { group: "B", variable: "v9", value: "6" }, { group: "B", variable: "v10", value: "67" }, { group: "C", variable: "v1", value: "96" }, { group: "C", variable: "v2", value: "13" }, { group: "C", variable: "v3", value: "98" }, { group: "C", variable: "v4", value: "10" }, { group: "C", variable: "v5", value: "86" }, { group: "C", variable: "v6", value: "23" }, { group: "C", variable: "v7", value: "74" }, { group: "C", variable: "v8", value: "47" }, { group: "C", variable: "v9", value: "73" }, { group: "C", variable: "v10", value: "40" }, { group: "D", variable: "v1", value: "75" }, { group: "D", variable: "v2", value: "18" }, { group: "D", variable: "v3", value: "92" }, { group: "D", variable: "v4", value: "43" }, { group: "D", variable: "v5", value: "16" }, { group: "D", variable: "v6", value: "27" }, { group: "D", variable: "v7", value: "76" }, { group: "D", variable: "v8", value: "24" }, { group: "D", variable: "v9", value: "1" }, { group: "D", variable: "v10", value: "87" }, { group: "E", variable: "v1", value: "44" }, { group: "E", variable: "v2", value: "29" }, { group: "E", variable: "v3", value: "58" }, { group: "E", variable: "v4", value: "55" }, { group: "E", variable: "v5", value: "65" }, { group: "E", variable: "v6", value: "56" }, { group: "E", variable: "v7", value: "9" }, { group: "E", variable: "v8", value: "78" }, { group: "E", variable: "v9", value: "49" }, { group: "E", variable: "v10", value: "36" }, { group: "F", variable: "v1", value: "35" }, { group: "F", variable: "v2", value: "80" }, { group: "F", variable: "v3", value: "8" }, { group: "F", variable: "v4", value: "46" }, { group: "F", variable: "v5", value: "48" }, { group: "F", variable: "v6", value: "100" }, { group: "F", variable: "v7", value: "17" }, { group: "F", variable: "v8", value: "41" }, { group: "F", variable: "v9", value: "33" }, { group: "F", variable: "v10", value: "11" }, { group: "G", variable: "v1", value: "77" }, { group: "G", variable: "v2", value: "62" }, { group: "G", variable: "v3", value: "94" }, { group: "G", variable: "v4", value: "15" }, { group: "G", variable: "v5", value: "69" }, { group: "G", variable: "v6", value: "63" }, { group: "G", variable: "v7", value: "61" }, { group: "G", variable: "v8", value: "54" }, { group: "G", variable: "v9", value: "38" }, { group: "G", variable: "v10", value: "93" }, { group: "H", variable: "v1", value: "39" }, { group: "H", variable: "v2", value: "26" }, { group: "H", variable: "v3", value: "90" }, { group: "H", variable: "v4", value: "83" }, { group: "H", variable: "v5", value: "31" }, { group: "H", variable: "v6", value: "2" }, { group: "H", variable: "v7", value: "51" }, { group: "H", variable: "v8", value: "28" }, { group: "H", variable: "v9", value: "42" }, { group: "H", variable: "v10", value: "7" }, { group: "I", variable: "v1", value: "5" }, { group: "I", variable: "v2", value: "60" }, { group: "I", variable: "v3", value: "21" }, { group: "I", variable: "v4", value: "25" }, { group: "I", variable: "v5", value: "3" }, { group: "I", variable: "v6", value: "70" }, { group: "I", variable: "v7", value: "34" }, { group: "I", variable: "v8", value: "68" }, { group: "I", variable: "v9", value: "57" }, { group: "I", variable: "v10", value: "32" }, { group: "J", variable: "v1", value: "19" }, { group: "J", variable: "v2", value: "85" }, { group: "J", variable: "v3", value: "53" }, { group: "J", variable: "v4", value: "45" }, { group: "J", variable: "v5", value: "71" }, { group: "J", variable: "v6", value: "64" }, { group: "J", variable: "v7", value: "4" }, { group: "J", variable: "v8", value: "12" }, { group: "J", variable: "v9", value: "97" }, { group: "J", variable: "v10", value: "72" }]
export const Simple = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => {
        if (!svgRef.current) return;
        var myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        var myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

        var margin = { top: 30, right: 30, bottom: 30, left: 30 },
            width = 450 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        const heatMapGroup = svg.select('.heatMapGroup')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width])
            .domain(myGroups)
            .padding(0.01);
        heatMapGroup.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Build X scales and axis:
        var y = d3.scaleBand()
            .range([height, 0])
            .domain(myVars)
            .padding(0.01);
        heatMapGroup.append("g")
            .call(d3.axisLeft(y));

        // Build color scale
        const colorScale = d3.scaleSequential(
            d3.interpolate('#ffffff', '#83c581'))
            .domain([0, 100]);

        //Read the data
        heatMapGroup.selectAll('rect')
            .data(data, (d: any) => d.group + ':' + d.variable)
            .enter()
            .append("rect")
            .on('mousemove', onMouseHover)
            .on('mouseout', onMouseOut)
            .attr("x", (d: any) => x(d.group)!)
            .attr("y", (d: any) => y(d.variable)!)
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("cursor", "pointer")
            .style("fill", (d: any) => colorScale(d.value));

    }, [svgRef]);

    const onMouseHover = ({ group, variable, value }: any, i: any, arr: any) => {
        d3.select(arr[i])
            .attr('stroke', '#6495ed')
            .attr('stroke-width', 2)

        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .html(`[${group},${variable}]: ${value}`);
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
            title={"Simple Heatmap Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "simple"
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
width:800px;
height:500px;
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