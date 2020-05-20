
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import { Pie } from 'App/components/Charts';
import { randomNum } from 'App/utils';

const months = ["January", "February", "March", "April"];

export const Simple = ({ location: { pathname } }: any) => {
    const [data, setData] = React.useState<Array<any>>(Array);

    React.useEffect(() => {
        setData(months.map(m => ({
            key: m,
            value: randomNum(10, 50)
        })))
    }, []);

    return (
        <RouteWrapper
            title={"Simple Pie Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "simple"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <Pie
                height={500}
                width={800}
                series={data} />
        </RouteWrapper>
    )
}