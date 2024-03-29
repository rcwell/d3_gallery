
import React from 'react';
import { Bar } from 'App/components/Charts';
import { randomNum } from 'App/utils';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septment", "October", "November", "December"];

export const Simple = () => {
    const [data, setData] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        setData(Array(1).fill(0).map((_, i) => ({
            name: `Dataset_${i + 1}`,
            data: months.map((month) => ({
                y: month,
                x: randomNum(50, 80)
            }))
        })))
    }, [])

    return (
        <Bar
            margin={{ top: 60, right: 20, bottom: 60, left: 180 }}
            height={500}
            width={800}
            series={data}
            title={{
                text: 'Sales',
                align: 'middle',
                location: 'top'
            }}
            yaxis={{
                title: {
                    text: 'Months',
                    align: 'middle'
                },
                categories: months
            }}
            xaxis={{
                title: {
                    text: "Quantity",
                    align: 'middle'
                },
                min: 40,
                max: 80
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
    )
}
