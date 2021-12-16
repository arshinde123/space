import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertComponent(props) {
    const {
        title,
        description,
        severity,
        variant,
        onClose,
        color,
        icon,
        sx,
    } = props
    return (
        <Alert
            sx={sx || { width: '100%' }}
            severity={severity}
            variant={variant}
            onClose={onClose}
            color={color}
            icon={icon}
            {...props}
        >
            {title && <AlertTitle>{title}</AlertTitle>}
            {description}
        </Alert>
    );
}
