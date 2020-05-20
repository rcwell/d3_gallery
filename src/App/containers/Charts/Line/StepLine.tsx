import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { MainRoute } from '../index';
import { randomNum } from 'App/utils';
import { LineChart } from 'App/components/Charts';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septment", "October", "November", "December"];

export const StepLine = ({ location: { pathname } }: any) => {
    const [data, setData] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        setData(Array(1).fill(0).map((_, i) => ({
            name: `Dataset_${i + 1}`,
            data: months.map((month, j) => ({
                x: month,
                y: randomNum(1, 95)
            }))
        })))
    }, [])

    return (
        <RouteWrapper
            title={"Step Line Chart"}
            route={[MainRoute, {
                path: pathname,
                displayname: "Step Line"
            }]}
            description={"Lorem ipsum dolor sith amet"}>
            <LineChart
                margin={{ top: 60, right: 20, bottom: 60, left: 180 }}
                height={500}
                width={800}
                series={data}
                stroke={{
                    curve:'step'
                }}
                title={{
                    text: 'Sales',
                    align: 'middle',
                    location: 'top'
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
                    max:100,
                    startFromZero: true
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