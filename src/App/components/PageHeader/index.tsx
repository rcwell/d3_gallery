import React from 'react';
import BreadCrumbs from 'App/components/Breadcrumbs';
import { Header, Title, Description } from 'App/components/Styled';
import { PageHeaderProps } from 'App/interface';

const PageHeader = ({ title, description, route }: PageHeaderProps) => {
    return (
        <Header>
            <BreadCrumbs links={route} />
            <Title>{title}</Title>
            <Description>
                {description}
            </Description>
        </Header>
    )
}

export default PageHeader;