export interface SectionProps {
    title: string;
    description: string;
    contents: Array<CardProps>;
}

export interface CardProps {
    title: string;
    description: string;
    icon?: JSX.Element;
    id?: string;
    code?: string;
}

export interface PageHeaderProps {
    title: string,
    description: string;
    route:Array<String>;
}