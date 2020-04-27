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
        code: '<rect/>'
    },
    {
        title: 'Circle',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Circle />,
        code: '<circle/>'
    },
    {
        title: 'Ellipse',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Ellipse />,
        code: '<ellipse/>'
    },
    {
        title: 'Line',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Line />,
        code: '<line/>'
    },
    {
        title: 'Polygon',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Polygon />,
        code: '<polygon/>'
    },
    {
        title: 'Polyline',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Polyline />,
        code: '<polyline/>'
    },
    {
        title: 'Path',
        description: 'Lorem ipsum dolor sith amet',
        icon: <Path />,
        code: '<path/>'
    }
];
const BasicAxis: Array<CardProps> = [
    {
        title: 'Single Axis',
        description: 'Lorem ipsum dolor sith amet',
        icon: <SingleAxes />,
        code: 'x-axis'
    },
    {
        title: 'X & Y Axis',
        description: 'Lorem ipsum dolor sith amet',
        icon: <XYAxes />,
        code: 'x-y-axis'
    },
    {
        title: 'Formatted Axis',
        description: 'Lorem ipsum dolor sith amet',
        icon: <FormattedAxis />,
        code: 'formatted-axis'
    }
];
const BasicScales: Array<CardProps> = [
    {
        title: 'Linear',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Band',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Point',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Ordinal',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Threshold',
        description: 'Lorem ipsum dolor sith amet'
    }
]
const CoordPlotting: Array<CardProps> = [
    {
        title: 'Coordinatates',
        description: 'Lorem ipsum dolor sith amet'
    },
    {
        title: 'Plotting',
        description: 'Lorem ipsum dolor sith amet'
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