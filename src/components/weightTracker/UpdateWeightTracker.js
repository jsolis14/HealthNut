import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper_container: {
        marginBottom: '20px',
        width: '1100px',

    },
    chart: {
        padding: '10px',

    }
}));

export default function UpdateWeightTracker() {
    const classes = useStyles();
    return (
        <div>
            this is UpdateWeightTracker
        </div>
    )
}
