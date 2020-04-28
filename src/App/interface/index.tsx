export interface SectionProps {
    title: string;
    description: string;
    contents: Array<CardProps>;
    onCardClick?: (data: any) => void;
}

export interface CardProps {
    title: string;
    description: string;
    onClick?: (data: any) => void;
    icon?: JSX.Element;
    id?: string;
    code?: string;
    d?:any
}

export interface PageHeaderProps {
    title: string,
    description: string;
    route: Array<CrumbLink>;
}

export interface BreadcrumbProps {
    links: Array<CrumbLink>;
}

export interface CrumbLink {
    displayname: string;
    path: string;
}