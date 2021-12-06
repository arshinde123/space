import * as React from 'react';
import Box from '@mui/material/Box';

export default function BoxComponent(props) {
    return <Box {...props} sx={props.sx} />;
}
