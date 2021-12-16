import React from 'react';
import { Fab } from '@mui/material';

const FloatingButton = (props) => {
    const { text, color, variant } = props;
    return (
        <Fab variant={variant} color={color} {...props}>
            {text}
        </Fab>
    );
};

export default FloatingButton;
