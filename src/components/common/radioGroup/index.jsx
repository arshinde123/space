import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({
    row,
    radioGruopLabel,
    defaultValue,
    options,
    onChange,
}) {
    return (
        <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">{radioGruopLabel}</FormLabel>
            <RadioGroup
                aria-label={radioGruopLabel}
                defaultValue={defaultValue}
                onChange={onChange}
                name={'radio-buttons-group-' + radioGruopLabel}
                row={row}
            >
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        disabled={option.disabled}
                        checked={option.checked}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}
