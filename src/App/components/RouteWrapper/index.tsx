import React from 'react';
import PageHeader from "App/components/PageHeader";
import { ScrollableSection, Body } from 'App/components/Styled';

const RouteWrapper = ({ title, description, children }: any) => {
    return (
        <ScrollableSection>
            <PageHeader title={title} description={description} />
            <Body>
                {children}
            </Body>
        </ScrollableSection>
    )
};

export default RouteWrapper;