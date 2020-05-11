import React from 'react';
import styled from 'styled-components';

export const Dropdown = (props: any) => {
    const { options, value, onChange, className, style, placeholder } = props;
    const [_options, setOptions] = React.useState([{ key: '', displayName: '' }]);

    React.useEffect(() => {
        setOptions([
            {
                key: '',
                displayName: placeholder || 'Select option'
            },
            ...options
        ]);
    }, [options, placeholder]);

    const handleOnChange = (e: any) => {
        const index = e.currentTarget.selectedIndex;
        onChange(index === 0 ? { key: '', } : options[index - 1]);
    }

    return (
        <Select
            value={value.key || _options[0].key}
            style={style}
            className={className}
            onChange={handleOnChange}
        >
            {
                _options.map((option: any) => {
                    return (
                        <option key={option.key} value={option.key}>{option.displayName}</option>
                    )
                })}
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