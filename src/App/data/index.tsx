import React from 'react';
import {
    Rect,
    Circle,
    Ellipse,
    Line,
    Polygon,
    Polyline,
    Path,
    SingleAxes,
    XYAxes,
    FormattedAxis
} from 'App/components/Icons';
import { CardProps } from 'App/interface';

const BasicShapes: Array<CardProps> = [
    {
        title: 'Rect',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Rect />,
        code: '<rect/>',
        d:{
            path:'shapes/rect'
        }
    },
    {
        title: 'Circle',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Circle />,
        code: '<circle/>',
        d:{
            path:'shapes/circle'
        }
    },
    {
        title: 'Ellipse',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Ellipse />,
        code: '<ellipse/>',
        d:{
            path:'shapes/ellipse'
        }
    },
    {
        title: 'Line',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Line />,
        code: '<line/>',
        d:{
            path:'shapes/line'
        }
    },
    {
        title: 'Polygon',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Polygon />,
        code: '<polygon/>',
        d:{
            path:'shapes/polygon'
        }
    },
    {
        title: 'Polyline',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Polyline />,
        code: '<polyline/>',
        d:{
            path:'shapes/polyline'
        }
    },
    {
        title: 'Path',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Path />,
        code: '<path/>',
        d:{
            path:'shapes/path'
        }
    }
];
const BasicAxis: Array<CardProps> = [
    {
        title: 'Single Axis',
        description: 'Lorem ipsum dolor sith amet',
        icon: <SingleAxes />,
        code: 'x-axis',
        d:{
            path:'axis/single-axis'
        }
    },
    {
        title: 'X & Y Axis',
        description: 'Lorem ipsum dolor sith amet',
        icon: <XYAxes />,
        code: 'x-y-axis',
        d:{
            path:'axis/x-y-axis'
        }
    },
    {
        title: 'Formatted Axis',
        description: 'Lorem ipsum dolor sith amet',
        icon: <FormattedAxis />,
        code: 'formatted-axis',
        d:{
            path:'axis/formatted-axis'
        }
    }
];
const BasicScales: Array<CardProps> = [
    {
        title: 'Linear',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scales/linear'
        }
    },
    {
        title: 'Band',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scales/band'
        }
    },
    {
        title: 'Point',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scales/point'
        }
    },
    {
        title: 'Ordinal',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scales/ordinal'
        }
    },
    {
        title: 'Threshold',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scales/threshold'
        }
    }
]
const CoordPlotting: Array<CardProps> = [
    {
        title: 'Coordinatates',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'coordinates-plotting/coordinates'
        }
    },
    {
        title: 'Plotting',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'coordinates-plotting/plotting'
        }
    }
]

const LineCharts: Array<CardProps> = [
    {
        title: 'Basic',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'StepLine',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Timeseries',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Realtime',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const AreaCharts: Array<CardProps> = [
    {
        title: 'Basic',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Stacked',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Timeseries',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Realtime',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const BarCharts: Array<CardProps> = [
    {
        title: 'Basic',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Vertical',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Stacked',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Negative',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Timeseries',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Realtime',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Radial',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const ScatterCharts: Array<CardProps> = [
    {
        title: 'Scatter',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Bubble',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Timeseries',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Icons',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const PieCharts: Array<CardProps> = [
    {
        title: 'Basic',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Pattern',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Image',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Donut',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const RadarCharts: Array<CardProps> = [
    {
        title: 'Basic',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Color Fill Polygon',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const HeatmapCharts: Array<CardProps> = [
    {
        title: 'Basic',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Color Range',
        description: 'Lorem ipsum dolor sith amet'
    }
];
const GeoMaps: Array<CardProps> = [
    {
        title: 'Basic World Map',
        description: 'Lorem ipsum dolor sith amet',
    },
    {
        title: 'Chrolopleth',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Bubble Map',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Pattern Fill',
        description: 'Lorem ipsum dolor sith amet'
    }
];

export {
    BasicShapes,
    BasicAxis,
    BasicScales,
    CoordPlotting,
    LineCharts,
    AreaCharts,
    BarCharts,
    ScatterCharts,
    PieCharts,
    RadarCharts,
    HeatmapCharts,
    GeoMaps
}