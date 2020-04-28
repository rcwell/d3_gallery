import React from 'react';
import Section from 'App/components/Section';
import PageHeader from 'App/components/PageHeader';
import { ScrollableSection, Body } from 'App/components/Styled';
import { GeoMaps } from 'App/data';

const Geo = () => {
    return (
        <ScrollableSection>
            <PageHeader title={"Geo"} description={"Lorem ipsum dolor sith amet"} route={["HOME", "GEO"]} />
            <Body>
                <Section
                    title={""}
                    description={""}
                    contents={GeoMaps} />
            </Body>
        </ScrollableSection>
    );
};

export default Geo;