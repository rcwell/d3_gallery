
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import styled from 'styled-components';
import * as d3 from 'd3';

const data = [
    [{
        axis: "Monday",
        value: 8
    }, {
        axis: "Tuesday",
        value: 7
    }, {
        axis: "Wednesday",
        value: 6
    }, {
        axis: "Thursday",
        value: 4
    }, {
        axis: "Friday",
        value: 2
    }, {
        axis: "Saturday",
        value: 2
    }],
    [{
        axis: "Monday",
        value: 2
    }, {
        axis: "Tuesday",
        value: 2
    }, {
        axis: "Wednesday",
        value: 6
    }, {
        axis: "Thursday",
        value: 8.5
    }, {
        axis: "Friday",
        value: 9
    }, {
        axis: "Saturday",
        value: 10
    }]
];

export const ColorFill = ({ location: { pathname } }: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);


    const hideTooltip = () => {
        d3.select('.tooltip').style('display', 'none');
    }

    const showTooptip = (d: any) => {
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .style('background', d.fill)
            .html(`${d.axis}: ${d.value}`);
    };


    React.useEffect(() => {
        if (!svgRef.current) return;

        const margin = { top: 100, right: 100, bottom: 100, left: 100 },
            width = 800 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const allAxis = data[0].map(d => d.axis);

        const colorScale = d3.scaleOrdinal()
            .domain(data.map((_, i) => i.toString()))
            .range(d3.schemeSet2);

        const cfg = {
            w: width,
            h: height,
            margin: margin,
            maxValue: 10,
            levels: 5,
            roundStrokes: false,
            color: colorScale,
            labelFactor: 1.1,
            wrapWidth: 60,
            opacityArea: 0.35,
            dotRadius: 4,
            opacityCircles: 0.1,
            strokeWidth: 2,
        };

        const total = allAxis.length,
            radius = Math.min(cfg.w / 2, cfg.h / 2),
            angleSlice = Math.PI * 2 / total;

        const rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, cfg.maxValue]);

        const svg = d3.select(svgRef.current);
        const g = svg.select(".radarGroup")
            .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");

        const axisGrid = g.append("g").attr("class", "axisWrapper");


        const radarGrid = d3.radialLine()
            .radius((d: any) => rScale(d.value))
            .angle((_, i) => i * angleSlice)
            .curve(d3.curveLinearClosed);

        axisGrid.selectAll(".gridPaths")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter()
            .append("path")
            .attr("class", (_, i) => ["gridPaths", i % 2 === 0 ? "even" : "odd"].join(" "))
            .attr("d", (d) => radarGrid(allAxis.map(x => ({
                axis: x,
                value: d * 2
            })) as any));

        axisGrid.selectAll(".axisLabel")
            .data(d3.range(1, (cfg.levels + 1)).reverse())
            .enter().append("text")
            .attr("class", "axisLabel")
            .attr("dy", "0.4em")
            .attr("x", 4)
            .attr("y", d => -d * radius / cfg.levels)
            .text(d => cfg.maxValue * d / cfg.levels);

        const axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (_, i) => rScale(cfg.maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y2", (_, i) => rScale(cfg.maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("class", "line");

        axis.append("text")
            .attr("class", "legend")
            .attr("dy", "0.35em")
            .attr("x", (_, i) => rScale(cfg.maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("y", (_, i) => rScale(cfg.maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
            .text(d => d)
            .call(textWrap, cfg.wrapWidth);

        const radarLine = d3.radialLine()
            .radius((d: any) => rScale(d.value))
            .angle((_, i) => i * angleSlice)
            .curve(d3.curveLinearClosed);

        const blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");

        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", (d: any) => radarLine(d))
            .style("fill", (_, i) => cfg.color(i.toString()) as any)
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function (d, i) {
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1);
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);
            })
            .on('mouseout', function () {
                d3.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });

        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", (d: any) => radarLine(d) || '')
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", (_, i) => cfg.color(i.toString()) as any)
            .style("fill", "none");


        const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "radarCircleWrapper");

        blobCircleWrapper
            .selectAll(".radarInvisibleCircle")
            .data((d, i) => d.map(x => ({ ...x, fill: cfg.color(i.toString()) as string })))
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr("fill", d => d.fill)
            .style("cursor", "pointer")
            .style("pointer-events", "all")
            .on("mousemove", showTooptip)
            .on("mouseout", hideTooltip);
    }, [svgRef]);

    const textWrap = (selection: d3.Selection<SVGTextElement, string, SVGGElement, unknown>, width: number) => {
        selection.each((_, i, ar) => {
            const text = d3.select(ar[i]);
            const words = text.text().split(/\s+/).reverse();
            const x = text.attr("x");
            const y = text.attr("y");
            const dy = parseFloat(text.attr("dy"));

            let lineNumber = 0;
            let lines: any = [];
            let tspan = text.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em");

            while (words.length > 0) {
                const word = words.pop();
                lines.push(word);
                tspan.text(lines.join(" "));
                if (tspan.node()!.getComputedTextLength() > width) {
                    lines.pop();
                    tspan.text(lines.join(" "));
                    lines = [word];
                    tspan = text.append("tspan")
                        .attr("x", text.attr("x"))
                        .attr("y", text.attr("y"))
                        .attr("dy", ++lineNumber * 1.1 + dy + "em")
                        .text(word!);
                }
            }
        })
    }

    return (
        <RouteWrapper
            title={"Color Fill Polygon Radar Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Color Fill Polygon"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <Wrapper>
                <Svg ref={svgRef} >
                    <g className={"radarGroup"} />
                </Svg>
                <Tooltip className={'tooltip'} />
            </Wrapper>
        </RouteWrapper>
    )
}

const Svg = styled.svg`
    width:800px; 
    height:500px; 

    > .radarGroup > .axisWrapper{
        & circle.gridCircle {
            fill:#fff;
            stroke:#ccc;
        }
    
        & text.axisLabel{
            font-size: 10px;
            fill:#6a6a6a;
            text-anchor:middle;
        }

        & .axis {
            > line.line{
                stroke:#848484;
                stroke-width: 1px;
            }

            > text.legend{
                font-size: 11px;
                text-anchor: middle;
            }
        }
        & path.gridPaths {
            stroke:#848484;
            fill:#fff;
        }
        & path.gridPaths.even{
            fill:#f1f1f1;
        }
    }

`;
const Wrapper = styled.section`
    display:flex;
    justify-content: center;
`;
const Tooltip = styled.div`
  position: absolute;
  display: none;
  border-radius: 3px;
  box-shadow: 1px 6px 10px 0px #0003;
  padding: 6px;
`;
