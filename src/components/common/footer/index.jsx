import React from 'react';
import { Box } from '@mui/system';

import { makeStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    box: {
        textAlign: 'center',
    },
});

const Footer = ({ text }) => {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <Box sx={{ mx: 1, mt: 20 }} className={classes.box}>
                <Divider />
                <Typography
                    sx={{ padding: '16px' }}
                    color="primary"
                    variant="subtitle1"
                >
                    {text}
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;
