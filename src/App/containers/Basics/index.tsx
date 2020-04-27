import React from 'react';
import {
    ScrollContent,
    Header,
    Title,
    Description,
    BodyContent
} from 'App/components/Styled';
import {
    BreadCrumbs,
    Section
} from 'App/components/Layout';
import {
    BasicShapes,
    BasicAxis,
    BasicScales,
    CoordPlotting
} from 'App/data';

const Basics = () => {
    return (
        <>
            <BreadCrumbs links={["HOME", "BASICS"]} />
            <ScrollContent>
                <Header>
                    <Title>Basics</Title>
                    <Description>
                        Lorem ipsum dolor sith amet
                </Description>
                </Header>
                <BodyContent>
                    <Section
                        title={"Shapes"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={BasicShapes} />
                    <Section
                        title={"Axis"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={BasicAxis} />
                    <Section
                        title={"Principal Scales"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={BasicScales} />
                    <Section
                        title={"Coordinates and Plotting"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={CoordPlotting} />
                </BodyContent>
            </ScrollContent>
        </>
    );
};

export default Basics;