import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        // textAlign: 'center',
        // color: theme.palette.text.secondary,
    },
    meal_container: {
        display: 'flex',
        flexDirection: 'column',
    },
    meal_icons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    meal_serving: {
        color: 'grey'
    },
    meal_icons__text: {
        marginRight: '1rem',

    },
    meal_title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
}));

export default function FoodItem({ food }) {

    const classes = useStyles();
    return (
        <Grid item >
            <Paper className={classes.paper}>
                <div>
                    <Typography><b>{food.food.name}</b></Typography>
                    <Typography className={classes.meal_serving}>{`Servings: ${food.servings}`}</Typography>
                </div>
                <div className={classes.meal_icons}>
                    <Typography className={classes.meal_icons__text}>{`${food.food.total_cal} cal`}</Typography>
                    <DeleteForeverIcon className={classes.meal_icons__text} />
                    <EditIcon className={classes.meal_icons__text} />
                </div>
            </Paper>
        </Grid>
    )
}
