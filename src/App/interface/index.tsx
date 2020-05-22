// Common Used Interfaces

export interface SectionProps {
    contents: Array<CardProps>;
    onCardClick?: (data: any) => void;
    title?: string;
    description?: string;
}

export interface CardProps {
    title: string;
    description: string;
    onClick?: (data: any) => void;
    icon?: JSX.Element;
    id?: string;
    code?: string;
    [key: string]: any;
}