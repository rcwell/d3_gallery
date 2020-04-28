import React from 'react';
import PageHeader from "App/components/PageHeader";
import { ScrollableSection, Body } from 'App/components/Styled';

const RouteWrapper = ({ title, description, route, children }: any) => {
    return (
        <ScrollableSection>
            <PageHeader title={title} description={description} route={route} />
            <Body>
                {children}
            </Body>
        </ScrollableSection>
    );
};

export default RouteWrapper;