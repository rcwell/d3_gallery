export * from './Line';
export * from './Area';
export * from './Bar';
export * from './Column';
export * from './RadialBar';
export * from './ScatterPlot';
export * from './Pie';

// Charts Inteface
export interface SVGProps {
    margin: Margin;
    height: number;
    width: number;
}
export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface ChartProps {
    title: AxisTitle & {
        location: 'left' | 'right' | 'top' | 'bottom'
    },
    legend: {
        location: 'left' | 'right' | 'top' | 'bottom',
        align: 'start' | 'middle' | 'end',
        alignToParentSvg?: Boolean
    },
    colorsScheme?: Array<string>
}

export interface VerticalChartProps {
    xaxis: {
        categories?: Array<string>,
        title: AxisTitle,
        datetime?: boolean,
        offset?: Offset
    },
    yaxis: {
        title: AxisTitle,
        startFromZero?: Boolean,
        min?: number,
        max?: number,
        offset?: Offset
    }
}

export interface HorizontalChartProps {
    xaxis: {
        title: AxisTitle,
        startFromZero?: Boolean,
        min?: number,
        max?: number,
        offset?: Offset
    },
    yaxis: {
        categories?: Array<string>,
        title: AxisTitle,
        datetime?: boolean,
        offset?: Offset
    }
}

interface Offset {
    top?: number,
    bottom?: number,
    left?: number,
    right?: number
}

interface AxisTitle {
    text: string,
    align: 'start' | 'middle' | 'end',
    alignToParentSvg?: Boolean
}