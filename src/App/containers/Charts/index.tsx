import React from 'react';
import Section from 'App/components/Section';
import PageHeader from 'App/components/PageHeader';
import {
    ScrollableSection,
    Body
} from 'App/components/Styled';
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
        <ScrollableSection>
            <PageHeader title={"Charts"} description={"Lorem ipsum dolor sith amet"} route={["HOME", "CHARTS"]} />
            <Body>
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
            </Body>
        </ScrollableSection>
    );
};

export default Charts;