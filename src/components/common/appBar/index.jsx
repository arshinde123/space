import * as React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    link: { color: 'inherit', textDecoration: 'none' },
});

export default function ButtonAppBar(props) {
    const {
        color,
        position,
        brandLink,
        brandName,
    } = props;
    const classes = useStyles();
    return (
        <Box sx={{ flexGrow: 1 }} {...props}>
            <AppBar position={position} color={color} {...props}>
                <Toolbar variant="regular" {...props}>
                    {brandLink ? (
                        <Link to={brandLink} className={classes.link}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {brandName}
                            </Typography>
                        </Link>
                    ) : (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {brandName}
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
