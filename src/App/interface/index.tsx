export interface SectionProps {
    title: string;
    description: string;
    contents: Array<CardProps>;
    onCardClick?: (data: any) => void;
}

export interface CardProps {
    title: string;
    description: string;
    onClick?: (data: any) => void;
    icon?: JSX.Element;
    id?: string;
    code?: string;
    d?: any
}

export interface PageHeaderProps {
    title: string,
    description: string;
}

export interface BreadcrumbProps {
    links: Array<CrumbLink>;
}

export interface CrumbLink {
    displayName: string;
    path: string;
}

// Charts
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

