
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import { Radar } from 'App/components/Charts/Radar';
import { randomNum } from 'App/utils';

const axis = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const ColorFill = ({ location: { pathname } }: any) => {
    const [data, setData] = React.useState<Array<any>>(Array);

    React.useEffect(() => {
        setData(Array(2).fill(0).map(() => axis.map(x => ({
            axis: x,
            value: randomNum(5, 10)
        }))))
    }, []);

    return (
        <RouteWrapper
            title={"Color Fill Polygon Radar Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Color Fill  Polygon"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <Radar
                polygon
                axis={axis}
                series={data} />
        </RouteWrapper>
    )
}
