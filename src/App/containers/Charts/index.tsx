import React from 'react';
import {
    ScrollContent,
    Header,
    Title,
    Description,
    BodyContent
}from 'App/components/Styled';
import {
    BreadCrumbs,
    Section
}from 'App/components/Layout';
import {
    LineCharts,
    AreaCharts,
    BarCharts,
    ScatterCharts,
    PieCharts,
    RadarCharts,
    HeatmapCharts
} from 'App/data';

const Charts = () => {
    return (
        <>
            <BreadCrumbs links={["HOME", "CHARTS"]} />
            <ScrollContent>
                <Header>
                    <Title>Charts</Title>
                    <Description>
                        Lorem ipsum dolor sith amet
                </Description>
                </Header>
                <BodyContent>
                    <Section
                        title={"Line"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={LineCharts} />
                    <Section
                        title={"Area"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={AreaCharts} />
                    <Section
                        title={"Bar"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={BarCharts} />
                    <Section
                        title={"Scatter"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={ScatterCharts} />
                    <Section
                        title={"Pie"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={PieCharts} />
                    <Section
                        title={"Radar"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={RadarCharts} />
                    <Section
                        title={"Heatmap"}
                        description={"Lorem ipsum dolor sith amet"}
                        contents={HeatmapCharts} />
                </BodyContent>
            </ScrollContent>
        </>
    );
};

export default Charts;