
import React from 'react';
import { Radar } from 'App/components/Charts/Radar';
import { randomNum } from 'App/utils';

const axis = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

export const Simple = () => {
    const [data, setData] = React.useState<Array<any>>(Array);

    React.useEffect(() => {
        setData(Array(2).fill(0).map(() => axis.map(x => ({
            axis: x,
            value: randomNum(5, 10)
        }))))
    }, []);

    return (
        <Radar
            axis={axis}
            series={data} />
    )
}
