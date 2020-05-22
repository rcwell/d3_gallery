import React from 'react';
import { Header } from 'App/components/Styled';
import { Code, H1, Caption } from 'App/components/Typography';

interface IPageHeader {
    title: string,
    description: string;
}

const PageHeader = ({ title, description }: IPageHeader) => {
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
            <H1>{title}</H1>
            <Caption>
                {renderDescription()}
            </Caption>
        </Header>
    )
}

export default PageHeader;