import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

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

    }
}));

export default function MealGrid() {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1} >
                <Grid container item className={classes.meal_container}>
                    <Typography>BreakFast</Typography>
                    {/* list of food items */}
                    <Grid item >
                        <Paper className={classes.paper}>
                            <div>
                                <Typography><b>Salmon</b></Typography>
                                <Typography className={classes.meal_serving}>Servings: 2</Typography>
                            </div>
                            <div className={classes.meal_icons}>
                                <Typography className={classes.meal_icons__text}>540 cal</Typography>
                                <DeleteForeverIcon className={classes.meal_icons__text} />
                                <EditIcon className={classes.meal_icons__text} />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item >
                        <Paper className={classes.paper}>
                            <div>
                                <Typography><b>Salmon</b></Typography>
                                <Typography className={classes.meal_serving}>Servings: 2</Typography>
                            </div>
                            <div className={classes.meal_icons}>
                                <Typography className={classes.meal_icons__text}>540 cal</Typography>
                                <DeleteForeverIcon className={classes.meal_icons__text} />
                                <EditIcon className={classes.meal_icons__text} />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item className={classes.meal_container}>
                    <Typography>Lunch</Typography>
                    {/* list of food items */}
                    <Grid item >
                        <Paper className={classes.paper}>
                            <div>
                                <Typography><b>Salmon</b></Typography>
                                <Typography className={classes.meal_serving}>Servings: 2</Typography>
                            </div>
                            <div className={classes.meal_icons}>
                                <Typography className={classes.meal_icons__text}>540 cal</Typography>
                                <DeleteForeverIcon />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item className={classes.meal_container}>
                    <Typography>Dinner</Typography>
                    {/* list of food items */}
                    <Grid item >
                        <Paper className={classes.paper}>
                            <div>
                                <Typography><b>Salmon</b></Typography>
                                <Typography className={classes.meal_serving}>Servings: 2</Typography>
                            </div>
                            <div className={classes.meal_icons}>
                                <Typography className={classes.meal_icons__text}>540 cal</Typography>
                                <DeleteForeverIcon />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item className={classes.meal_container}>
                    <Typography>Snacks</Typography>
                    {/* list of food items */}
                    <Grid item >
                        <Paper className={classes.paper}>
                            <div>
                                <Typography><b>Salmon</b></Typography>
                                <Typography className={classes.meal_serving}>Servings: 2</Typography>
                            </div>
                            <div className={classes.meal_icons}>
                                <Typography className={classes.meal_icons__text}>540 cal</Typography>
                                <DeleteForeverIcon />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
