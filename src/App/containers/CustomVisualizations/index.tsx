import React from 'react';
import Section from 'App/components/Section';
import PageHeader from 'App/components/PageHeader';
import { ScrollableSection, Body } from 'App/components/Styled';

const CustomVisualizations = () => {
    const mainRoutes: Array<any> = [
        {
            path: "/",
            displayname: 'home'
        },
        {
            path: "/custom-visualization",
            displayname: 'custom visualizations'
        }
    ];
    return (
        <ScrollableSection>
            <PageHeader title={"Custom Visualizations"} description={"Lorem ipsum dolor sith amet"} route={mainRoutes} />
            <Body>
                <Section
                    title={""}
                    description={""}
                    contents={[]} />
            </Body>
        </ScrollableSection>
    );
};

export default CustomVisualizations;