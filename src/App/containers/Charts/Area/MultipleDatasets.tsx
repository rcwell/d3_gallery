import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import { randomNum } from 'App/utils';
import { AreaChart } from 'App/components/Charts';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septment", "October", "November", "December"];

export const MultipleDatasets = ({ location: { pathname } }: any) => {
    const [data, setData] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        setData(Array(3).fill(0).map((_, i) => ({
            name: `Dataset_${i + 1}`,
            data: months.map((month) => ({
                x: month,
                y: randomNum((i+1)*10, (i+1)*20)
            }))
        })))
    }, [])

    return (
        <RouteWrapper
            title={"Multiple Datasets Area Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "MultipleDatasets"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <AreaChart
                margin={{ top: 60, right: 20, bottom: 60, left: 180 }}
                height={500}
                width={800}
                series={data}
                title={{
                    text: 'Sales',
                    align: 'middle',
                    location: 'top'
                }}
                stroke={{
                    curve:'smooth'
                }}
                xaxis={{
                    title: {
                        text: 'Months',
                        align: 'middle'
                    },
                    categories: months
                }}
                yaxis={{
                    title: {
                        text: "Quantity",
                        align: 'middle'
                    },
                    startFromZero:true,
                    max:70
                }}
                legend={{
                    location: 'left',
                    align: 'start',
                }}
                colorsScheme={[
                    "#6494ED",
                    "#ffcf00",
                    "#FFA15C",
                    "#FFC65C",
                ]}
            />
        </RouteWrapper>
    )
}
