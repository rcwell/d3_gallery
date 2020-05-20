import { extent } from 'd3';

interface Series {
    name: string,
    data: Array<any>
}

export const getMinMax = (series: Array<Series>, axis: 'x' | 'y', config: { min: number; max: number, allowNegative: boolean }) => {
    if (series.length === 0) return [0, 0];

    const flat = series.reduce((acc: Array<number>, curr: Series) => [...acc, ...curr.data.map((d: any) => d[axis])], []);
    let mx = extent(flat);
    mx[0] = mx[0] || 0;
    mx[1] = mx[1] || 0;

    mx[0] = config.min && mx[0]! > config.min ? config.min : config.allowNegative ? mx[0]! -5 : mx[0]! >= 5 ? mx[0]! - 5 : 0;
    mx[1] = config.max && mx[1]! < config.max ? config.max : mx[1]! % 5 === 0 ? mx[1]! : mx[1]! + 5;

    return mx as [number, number];
}