import React from 'react';
import PageHeader from "App/components/PageHeader";
import Section from "App/components/Section";
import { ScrollableSection, Body } from 'App/components/Styled';
import {
    BasicShapes,
    BasicAxis,
    BasicScales,
    CoordPlotting
} from 'App/data';

const Basics = () => {
    const [title, setTitle] = React.useState(String);
    const [description, setDescription] = React.useState(String);
    const [route, setRoute] = React.useState<Array<String>>(Array);

    React.useEffect(() => {
        setTitle("Basics");
        setDescription("Lorem ipsum dolor sith amet");
        setRoute(["HOME", "BASICS"]);
    }, [])

    return (
        <ScrollableSection>
            <PageHeader title={title} description={description} route={route} />
            <Body>
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
            </Body>
        </ScrollableSection>
    );
};

export default Basics;
