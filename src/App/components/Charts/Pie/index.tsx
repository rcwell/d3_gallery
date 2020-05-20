import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

export const Pie = (props: any) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    const {
        width,
        height,
        series,
        donut
    } = props;

    const hideTooltip = () => {
        d3.select('.tooltip')
            .style('display', 'none');
    }

    const showTooptip = ({ data }: any, color: string) => {
        const { key, value } = data;
        d3.select('.tooltip')
            .style('left', (d3.event.pageX + 10) + 'px')
            .style('top', (d3.event.pageY - 25) + 'px')
            .style('display', 'inline-block')
            .style('background', color)
            .html(`${key}: ${value}`);
    };

    React.useEffect(() => {
        if (svgRef.current === null) return;
        const _svg = d3.select(svgRef.current);
        const radius = d3.min([width, height]) / 2;
        const innerRadius = donut ? radius / 2 : 0;

        const colorScale = d3.scaleOrdinal()
            .domain(series.map((x: any) => x.key))
            .range(d3.schemeSet2);

        const pie = d3.pie()
            .value((d: any) => d.value)
            .sort((a: any, b: any) => d3.ascending(a.value, b.value));
        const data_ready = pie(series);
        const arcGenerator = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        const pieGroup = _svg
            .select<SVGGElement>('.pieGroup')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pieEl = pieGroup
            .selectAll<SVGPathElement, null>('path')
            .data(data_ready);

        pieEl.enter()
            .append('path')
            .attr("stroke", "#ffffff")
            .style("stroke-width", "5")
            .style("stroke-linejoin", "round")
            .merge(pieEl)
            .on('mousemove', (d: any) => {
                const color = colorScale(d.data.key) as string;
                showTooptip(d, color)
            })
            .on('mouseout', hideTooltip)
            .transition()
            .duration(1000)
            .attr('d', arcGenerator as any)
            .attr('fill', (d: any) => colorScale(d.data.key) as string);

        pieEl
            .exit()
            .remove();

        const total = series.reduce((t: number, c: any) => t + c.value, 0);
        const annotationGroup = _svg
            .select<SVGGElement>('.annotationGroup')
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const annotation = annotationGroup
            .selectAll<SVGTextElement, null>('text')
            .data(data_ready);

        const values = series.map((s: any) => {
            const val = s.value;
            const percentage = (val / total) * 100;
            return `${s.key}: ${percentage.toFixed(1)}%`
        })

        const rad = radius * (donut ? 0.8 : 0.65);
        const arcLabel = d3.arc()
            .innerRadius(rad)
            .outerRadius(rad);

        // annotation
        //     .enter()
        //     .append('text')
        //     .style("text-anchor", "middle")
        //     .style("font-size", "1em")
        //     .style("font-weight", 600)
        //     .style("fill", "#000")
        //     .style("filter", "url(#shadow)")
        //     .text((_, i) => values[i])
        //     .merge(annotation)
        //     .transition()
        //     .duration(1000)
        //     .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`);
        annotation
            .enter()
            .append('text')
            .style("text-anchor", "middle")
            .style("font-size", "1em")
            .style("font-weight", 600)
            .style("fill", "currentColor")
            .text((_, i) => values[i])
            .merge(annotation)
            .transition()
            .duration(1000)
            .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`);

        annotation
            .exit()
            .remove();
    }, [svgRef, series, width, height, donut]);

    return (
        <Wrapper>
            <svg width={width} height={height} ref={svgRef} >
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feOffset in="blur" dx="1" dy="1" />
                    </filter>
                </defs>
                <PieGroup className={"pieGroup"} />
                <AnnotationGroup className={"annotationGroup"} />
            </svg>
            <Tooltip className={'tooltip'} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
    display:flex;
    justify-content: center;
`;
const PieGroup = styled.g`
    path {
        opacity:1;
        cursor:pointer;

        & text{
            pointer-events:none;
        }
    }
    path:hover {
        opacity:0.7;
    }
`;
const AnnotationGroup = styled.g`
    text{
        pointer-events:none;
    }
`;
const Tooltip = styled.div`
  position: absolute;
  display: none;
  border-radius: 3px;
  box-shadow: 1px 6px 10px 0px #0003;
  padding: 6px;
`;