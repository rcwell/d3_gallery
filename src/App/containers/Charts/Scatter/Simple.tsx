
import React from 'react';
import RouteWrapper from 'App/components/RouteWrapper';

import { Dropdown } from 'App/components/Dropdown'
import styled from 'styled-components';
import { data as carData } from './data';
import { ScatterPlot } from 'App/components/Charts';

interface Car {
    mpg: number;
    cylinders: number;
    displacement: number;
    horsepower: number;
    weight: number;
    acceleration: number;
    year: number;
    origin: string;
    name: string;
}

export const Simple = () => {
    const [data, setData] = React.useState<Array<any>>(Array);
    const [y, setY] = React.useState({
        key: 'weight',
        displayName: 'Weight',
        values: []
    });
    const [x, setX] = React.useState({
        key: 'horsepower',
        displayName: 'Horsepower',
        values: []
    });

    React.useEffect(() => {
        setData(carData.slice(0, 50).map(car => ({
            x: car[x.key as keyof Car],
            y: car[y.key as keyof Car]
        })));
    }, [x, y]);

    return (
        <RouteWrapper
            title={"Simple Scatter Chart"}
            description={"Lorem ipsum dolor sith amet"}>
            <Container>
                <AxesSelector>
                    <Dropdown
                        onChange={setY}
                        options={[
                            { displayName: "Mpg", key: "mpg", axis: 'y' },
                            { displayName: "Cylinders", key: "cylinders", axis: 'y' },
                            { displayName: "Displacement", key: "displacement", axis: 'y' },
                            { displayName: "Horsepower", key: "horsepower", axis: 'y' },
                            { displayName: "Weight", key: "weight", axis: 'y' },
                            { displayName: "Acceleration", key: "acceleration", axis: 'y' },
                            { displayName: "Year", key: "year", axis: 'y' }
                        ]}
                        value={y}
                        placeholder={"Select one"}
                    />
                    <div>x</div>
                    <Dropdown
                        onChange={setX}
                        options={[
                            { displayName: "Mpg", key: "mpg", axis: 'x' },
                            { displayName: "Cylinders", key: "cylinders", axis: 'x' },
                            { displayName: "Displacement", key: "displacement", axis: 'x' },
                            { displayName: "Horsepower", key: "horsepower", axis: 'x' },
                            { displayName: "Weight", key: "weight", axis: 'x' },
                            { displayName: "Acceleration", key: "acceleration", axis: 'x' },
                            { displayName: "Year", key: "year", axis: 'x' }
                        ]}
                        value={x}
                        placeholder={"Select one"}
                    />
                </AxesSelector>
                <ScatterPlot
                    width={800}
                    height={500}
                    series={data}
                    xaxis={{
                        title: {
                            text: x.displayName,
                            align: 'middle'
                        }
                    }}
                    yaxis={{
                        title: {
                            text: y.displayName,
                            align: 'middle'
                        }
                    }}
                />
            </Container>
        </RouteWrapper>
    )
}

const Container = styled.section`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

& circle {
    fill:cornflowerblue;
    opacity:0.3;
    cursor:pointer;
    transition:opacity .2s ease-in-out;
}
& circle:hover {
    opacity: 0.8;
}
`;

const AxesSelector = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;

    > div{
        margin: 0 10px;
    }
`;
