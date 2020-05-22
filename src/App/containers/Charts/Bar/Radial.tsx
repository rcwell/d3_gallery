import React from 'react';
import { RadialBar } from 'App/components/Charts';

export const Radial = () => {
    return (
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
    )
}
