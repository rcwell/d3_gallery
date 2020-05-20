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

interface RouteCardProps extends CardProps{
    d: {
        path:string;
    }
}

const BasicShapes: Array<RouteCardProps> = [
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
const BasicAxis: Array<RouteCardProps> = [
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
const BasicScales: Array<RouteCardProps> = [
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
const CoordPlotting: Array<RouteCardProps> = [
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

const LineCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'line/simple'
        }
    },
    {
        title: 'StepLine',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'line/step-line'
        }
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'line/multiple-datasets'
        }
    },
    {
        title: 'time-series',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'line/time-series'
        }
    }
];
const AreaCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'area/simple'
        }
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'area/multiple-datasets'
        }
    },
    {
        title: 'time-series',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'area/time-series'
        }
    }
];
const BarCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bar/simple'
        }
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bar/multiple-datasets'
        }
    },
    {
        title: 'Column',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bar/column'
        }
    },
    {
        title: 'Stacked',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bar/stacked'
        }
    },
    {
        title: 'Negative',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bar/negative'
        }
    },
    {
        title: 'Radial',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bar/radial'
        }
    }
];
const ScatterCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scatter/simple'
        }
    },
    {
        title: 'Bubble',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scatter/bubble'
        }
    },
    {
        title: 'Icons',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'scatter/icons'
        }
    }
];
const PieCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'pie/simple'
        }
    },
    {
        title: 'Pattern',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'pie/pattern'
        }
    },
    {
        title: 'Donut',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'pie/donut'
        }
    }
];
const RadarCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'radar/simple'
        }
    },
    {
        title: 'Color Fill Polygon',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'radar/color-fill'
        }
    }
];
const HeatmapCharts: Array<RouteCardProps> = [
    {
        title: 'Simple',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'heatmap/simple'
        }
    },
    {
        title: 'Multiple Datasets',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'heatmap/multiple-datasets'
        }
    },
    {
        title: 'Color Range',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'heatmap/color-range'
        }
    }
];
const GeoMaps: Array<RouteCardProps> = [
    {
        title: 'Simple World Map',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'simple-world-map'
        }
    },
    {
        title: 'Chrolopleth',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'chrolopleth'
        }
    },
    {
        title: 'Bubble Map',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'bubble-map'
        }
    },
    {
        title: 'Pattern Fill',
        description: 'Lorem ipsum dolor sith amet',
        d:{
            path:'pattern-fill'
        }
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