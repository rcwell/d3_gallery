import React from 'react';
import BreadCrumbs from 'App/components/Breadcrumbs';
import { Header, Title, Description } from 'App/components/Styled';
import { Code } from 'App/components/Typography';
import { PageHeaderProps } from 'App/interface';

const PageHeader = ({ title, description, route }: PageHeaderProps) => {

    const renderDescription = () => {
        const strArr: Array<string> = description.split(" ");
        const contents: Array<any> = [];
        let tempContents: Array<any> = [];
        strArr.forEach((str, i) => {
            if (str.includes("<") && str.includes(">")) {
                contents.push(tempContents.join(" ") + " ");
                contents.push(<Code key={i}>{str.replace("<", "").replace(">", "")}</Code>);
                tempContents = [" "];
            } else {
                tempContents.push(str);
            }
        });
        contents.push(tempContents.join(" "));
        return contents;
    }

    return (
        <Header>
            <BreadCrumbs links={route} />
            <Title>{title}</Title>
            <Description>
                {renderDescription()}
            </Description>
        </Header>
    )
}

export default PageHeader;