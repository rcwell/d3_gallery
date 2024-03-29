
import React from 'react';
import { randomNum } from 'App/utils';
import { ColumnBar } from 'App/components/Charts';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septment", "October", "November", "December"];

export const Stacked = () => {
    const [data, setData] = React.useState<Array<any>>([]);

    React.useEffect(() => {
        setData(Array(3).fill(0).map((_, i) => ({
            name: `Dataset_${i + 1}`,
            data: months.map((month) => ({
                x: month,
                y: randomNum(20, 35)
            }))
        })))
    }, []);

    return (
        <ColumnBar
            margin={{ top: 60, right: 20, bottom: 60, left: 180 }}
            height={500}
            width={800}
            series={data}
            stacked
            title={{
                text: 'Sales',
                align: 'middle',
                location: 'top'
            }}
            yaxis={{
                title: {
                    text: "Quantity",
                    align: 'middle'
                },
                min: 40,
                max: 80
            }}
            xaxis={{
                categories: months,
                title: {
                    text: 'Months',
                    align: 'middle'
                }
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
            ]} />
    )
}