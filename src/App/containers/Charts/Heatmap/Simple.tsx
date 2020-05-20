
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { HeatMap } from 'App/components/Charts/HeatMap';
import { randomNum } from 'App/utils';

const weeks = ['Week-1', 'Week-2', 'Week-3', 'Week-4', 'Week-5', 'Week-6', 'Week-7', 'Week-8'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Simple = () => {
    const [data, setData] = React.useState<Array<any>>(Array);

    React.useEffect(() => {
        setData(weeks.map(w => (days.map(d => ({
            x: w, y: d, value: randomNum(0, 4)
        })))).flat());
    }, []);

    return (
        <RouteWrapper
            title={"Simple Heatmap Chart"}

            description={"Lorem ipsum dolor sith amet"}>
            <HeatMap
                width={(weeks.length * 50) + 30 + 50}
                height={(days.length * 50) + 20}
                margin={{ top: 0, right: 50, bottom: 20, left: 30 }}
                series={data}
                colorScale={{
                    startColor: '#ffffff',
                    endColor: '#83c581',
                    range: {
                        min: 0,
                        max: 4
                    }
                }}
                xaxis={{
                    title: { text: "Weeks", align: "middle" },
                    categories: weeks
                }}
                yaxis={{
                    title: { text: "Days", align: "middle" },
                    categories: days
                }}
            />
        </RouteWrapper>
    )
}