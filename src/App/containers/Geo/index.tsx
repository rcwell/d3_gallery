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
    GeoMaps
} from 'App/data';

const Geo = () => {
    return (
        <>
            <BreadCrumbs links={["HOME", "GEO"]} />
            <ScrollContent>
                <Header>
                    <Title>Geo</Title>
                    <Description>
                        Lorem ipsum dolor sith amet
                </Description>
                </Header>
                <BodyContent>
                    <Section
                        title={""}
                        description={""}
                        contents={GeoMaps} />
                </BodyContent>
            </ScrollContent>
        </>
    );
};

export default Geo;