import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';
import { RadialBar } from 'App/components/Charts';

export const Radial = () => {
    return (
        <RouteWrapper
            title={"Radial Bar Chart"}
            description={"Lorem ipsum dolor sith amet"}>
            <RadialBar
                width={800}
                height={500}
                colorsScheme={[
                    "#6494ED",
                    "#ffcf00",
                    "#FFA15C",
                    "#FFC65C",
                ]}
                data={[
                    {
                        name: "Jan", value: 432
                    },
                    {
                        name: "Feb", value: 340
                    },
                    {
                        name: "Mar", value: 382
                    },
                    {
                        name: "Apr", value: 398
                    },
                    {
                        name: "May", value: 410
                    }
                ]}
            />
        </RouteWrapper>
    )
}
