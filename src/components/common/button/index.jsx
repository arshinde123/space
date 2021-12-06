import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons({ children, variant, color, onClick }) {
    return (
        <Button variant={variant} color={color} onClick={onClick}>
            {children}
        </Button>
    );
}
