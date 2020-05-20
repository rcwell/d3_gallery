
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import { Pie } from 'App/components/Charts';
import { randomNum } from 'App/utils';

const months = ["Jan", "Feb", "Mar", "Apr"];

export const Donut = ({ location: { pathname } }: any) => {
    const [data, setData] = React.useState<Array<any>>(Array);

    React.useEffect(() => {
        setData(months.map(m => ({
            key: m,
            value: randomNum(10, 50)
        })))
    }, []);

    return (
        <RouteWrapper
            title={"Donut Pie Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Donut"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <Pie
                donut
                height={500}
                width={800}
                series={data} />
        </RouteWrapper>
    )
}

// import React from 'react';
// import RouteWrapper from 'App/components/RouteWrapper';
// import { MainRoute } from '../index';
// import * as d3 from 'd3';
// import styled from 'styled-components';

// export const Donut = ({ location: { pathname } }: any) => {
//     const svgRef = React.useRef<SVGSVGElement>(null);


//     const hideTooltip = () => {
//         d3.select('.tooltip')
//             .style('display', 'none');
//     }

//     const showTooptip = ({ data }: any) => {
//         const { key, value } = data;
//         const colorScale = d3.scaleOrdinal()
//             .domain(["a", "b", "c", "d", "e", "f"])
//             .range(d3.schemeSet2);
//         d3.select('.tooltip')
//             .style('left', (d3.event.pageX + 10) + 'px')
//             .style('top', (d3.event.pageY - 25) + 'px')
//             .style('display', 'inline-block')
//             .style('background', colorScale(key) as string)
//             .html(`${key}: ${value}`);
//     };

//     React.useEffect(() => {
//         if (svgRef.current === null) return;
//         const _svg = d3.select(svgRef.current);
//         const width = 800;
//         const height = 500;
//         const innerRadius = 100;
//         const outerRadius = 200;
//         // const radius = 200;

//         const data = { a: 6, b: 16, c: 20, d: 14, e: 19, f: 12 }

//         const colorScale = d3.scaleOrdinal()
//             .domain(Object.keys(data))
//             .range(d3.schemeSet2);

//         const pie = d3.pie()
//             .value((d: any) => d.value)
//             .sort((a: any, b: any) => d3.ascending(a.key, b.key));

//         const data_ready = pie(d3.entries(data) as any);
//         const arcGenerator = d3.arc()
//             .innerRadius(innerRadius)
//             .outerRadius(outerRadius);

//         const pieGroup = _svg
//             .select<SVGGElement>('.pieGroup')
//             .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//         const pieEl = pieGroup
//             .selectAll<SVGPathElement, null>('path')
//             .data(data_ready);

//         pieEl.enter()
//             .append('path')
//             .attr("stroke", "#ffffff")
//             .style("stroke-width", "5")
//             .style("stroke-linejoin", "round")
//             .merge(pieEl)
//             .on('mousemove', showTooptip)
//             .on('mouseout', hideTooltip)
//             .transition()
//             .duration(1000)
//             .attr('d', arcGenerator as any)
//             .attr('fill', (d: any) => colorScale(d.data.key) as string);

//         pieEl
//             .exit()
//             .remove();

//         const total = Object.keys(data).reduce((t: number, key: any) => t + (data as any)[key], 0);
//         const annotationGroup = _svg
//             .select<SVGGElement>('.annotationGroup')
//             .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//         const annotation = annotationGroup
//             .selectAll<SVGTextElement, null>('text')
//             .data(data_ready);

//         const values = Object.keys(data).map((x: string) => {
//             const val = (data as any)[x];
//             const percentage = (val / total) * 100;
//             return `${x}: ${percentage.toFixed(1)}%`
//         })

//         const rad = (Math.min(width, height) / 2) * 0.65;
//         const arcLabel = d3.arc()
//             .innerRadius(rad)
//             .outerRadius(rad);

//         annotation
//             .enter()
//             .append('text')
//             .style("text-anchor", "middle")
//             .style("font-size", "1em")
//             .style("font-weight", 600)
//             .style("fill", "#000")
//             .style("filter", "url(#shadow)")
//             .text((_, i) => values[i])
//             .merge(annotation)
//             .transition()
//             .duration(1000)
//             .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`);
//         annotation
//             .enter()
//             .append('text')
//             .style("text-anchor", "middle")
//             .style("font-size", "1em")
//             .style("font-weight", 600)
//             .style("fill", "#fff")
//             .text((_, i) => values[i])
//             .merge(annotation)
//             .transition()
//             .duration(1000)
//             .attr("transform", (d: any) => `translate(${arcLabel.centroid(d)})`);

//         annotation
//             .exit()
//             .remove();
//     }, [svgRef]);

//     return (
//         <RouteWrapper
//             title={"Donut Pie Chart"}
//             route={[MainRoute, {
//                 path: pathname,
//                 displayname: "Donut"
//             }]}
//             description={"Lorem ipsum dolor sith amet"}>
//             <Wrapper>
//                 <svg width={800} height={500} ref={svgRef} >
//                     <defs>
//                         <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
//                             <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
//                             <feOffset in="blur" dx="1" dy="1" />
//                         </filter>
//                     </defs>
//                     <PieGroup className={"pieGroup"} />
//                     <AnnotationGroup className={"annotationGroup"} />
//                 </svg>
//                 <Tooltip className={'tooltip'} />
//             </Wrapper>
//         </RouteWrapper>
//     )
// }

// const Wrapper = styled.section`
//     display:flex;
//     justify-content: center;
// `;

// const PieGroup = styled.g`
//     path {
//         opacity:1;
//         cursor:pointer;

//         & text{
//             pointer-events:none;
//         }
//     }
//     path:hover {
//         opacity:0.7;
//     }
// `;

// const AnnotationGroup = styled.g`
//     text{
//         pointer-events:none;
//     }
// `;

// const Tooltip = styled.div`
//   position: absolute;
//   display: none;
//   border-radius: 3px;
//   box-shadow: 1px 6px 10px 0px #0003;
//   padding: 6px;
// `;