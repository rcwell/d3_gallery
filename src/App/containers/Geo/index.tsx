import React from 'react';
import Section from 'App/components/Section';
import PageHeader from 'App/components/PageHeader';
import { ScrollableSection, Body } from 'App/components/Styled';
import { GeoMaps } from 'App/data';

const Geo = () => {
    const mainRoutes: Array<any> = [
        {
            path: "/",
            displayname: 'home'
        },
        {
            path: "/geo",
            displayname: 'geo'
        }
    ];
    return (
        <ScrollableSection>
            <PageHeader title={"Geo"} description={"Lorem ipsum dolor sith amet"} route={mainRoutes} />
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