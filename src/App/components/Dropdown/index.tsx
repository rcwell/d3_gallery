import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Dropdown = ({ options, value, onChange, className, style, placeholder }: any) => {
    const [thisOptions, setOptions] = useState([{ key: '', displayName: '' }]);

    useEffect(() => setOptions([{
        key: '', displayName: placeholder || 'Select option'
    }, ...options]), [options, placeholder]);

    const handleOnChange = ({ currentTarget: { selectedIndex } }: any) =>
        onChange(selectedIndex === 0 ? { key: '', } : options[selectedIndex - 1]);

    return (
        <Select
            value={value.key || thisOptions[0].key}
            style={style}
            className={className}
            onChange={handleOnChange}>
            {thisOptions.map((option: any) => (
                <option key={option.key} value={option.key}>{option.displayName}</option>
            ))}
        </Select>
    )
}

const Select = styled.select`
    border: 1px solid #dadada;
    padding: 10px;
    border-radius: 2px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
`;