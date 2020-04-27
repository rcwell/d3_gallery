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

const CustomVisualizations = () => {
    return (
        <>
            <BreadCrumbs links={["HOME", "CUSTOM VISUALIZATIONS"]} />
            <ScrollContent>
                <Header>
                    <Title>Custom Visualizations</Title>
                    <Description>
                        Lorem ipsum dolor sith amet
                    </Description>
                </Header>
                <BodyContent>
                    <Section
                        title={""}
                        description={""}
                        contents={[]} />
                </BodyContent>
            </ScrollContent>
        </>
    );
};

export default CustomVisualizations;