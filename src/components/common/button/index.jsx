import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    const { children, variant, color, onClick } = props;
    return (
        <Button variant={variant} color={color} onClick={onClick} {...props}>
            {children}
        </Button>
    );
}
