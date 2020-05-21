
import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';

export const Path = ({ location: { pathname } }: RouteChildrenProps) => {
    return (
        <div>
            Path
        </div>
    )
}
