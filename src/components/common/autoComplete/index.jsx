import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
    const { options, inputLabel, width, onChange } = props;
    return (
        <Autocomplete
            {...props}
            disablePortal
            autoComplete={true}
            autoHighlight={false}
            options={options}
            sx={{ width: width }}
            onChange={onChange}
            renderInput={(params) => (
                <TextField {...params} label={inputLabel} />
            )}
        />
    );
}
