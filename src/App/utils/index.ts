import { Selection, select } from 'd3';
import { v4 as uuid } from 'uuid';

export const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const randomString = (len: number) => uuid().replace("-", '').slice(0, len);

export const getEnumKeys = <T extends object>(e: T): string[] =>
    Object.values(e)
        .filter(value => typeof value === 'string');

export const getEnumKeyValues = <T extends {}>(e: {}): T[] =>
    Object.values(e)
        .filter(value => typeof value === 'string') as T[];

export const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

export const textWrap = (selection: Selection<SVGTextElement, string, SVGGElement, unknown>, width: number) => {
    selection.each((_, i, ar) => {
        const text = select(ar[i]);
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
                    .attr("x", text.attr("x") || 0)
                    .attr("y", text.attr("y") || 0)
                    .attr("dy", ++lineNumber * 1.1 + dy + "em")
                    .text(word!);
            }
        }
    })
}


export const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const getLastOfArray = (arr: Array<any>) => arr.length > 0 ? arr[arr.length - 1] : null;