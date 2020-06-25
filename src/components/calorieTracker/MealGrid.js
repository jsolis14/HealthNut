import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import AddFoodModal from './AddFoodModal';

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

export default function MealGrid() {
    const classes = useStyles();
    const [anchorElBreakfast, setAnchorElBreakfast] = React.useState(null);
    const [anchorElLunch, setAnchorElLunch] = React.useState(null);
    const [anchorElDinner, setAnchorElDinner] = React.useState(null);
    const [anchorElSnack, setAnchorElSnack] = React.useState(null);
    const [showModal, setShowModal] = useState({ show: false, from: '' });

    const handleClose = () => {
        setAnchorElBreakfast(null);
    };

    // function handleAddFood() {
    //     setShowModal({show:true, from})
    // }

    return (
        <div>
            <Grid container spacing={1} >
                <Grid container item className={classes.meal_container}>
                    <div className={classes.meal_title}>
                        <Typography>BreakFast</Typography>
                        <Tooltip title="Add" aria-label="add" onClick={(e) => setAnchorElBreakfast(e.currentTarget)}>
                            <Fab color="secondary" size="small">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElBreakfast}
                            keepMounted
                            open={Boolean(anchorElBreakfast)}
                            onClose={() => setAnchorElBreakfast(null)}
                        >
                            <MenuItem onClick={() => setShowModal({ show: true, from: 'breakfast' })}>Add Food</MenuItem>
                            <MenuItem onClick={handleClose}>Add Meal</MenuItem>
                        </Menu>
                    </div>
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
                    <div className={classes.meal_title}>
                        <Typography>Lunch</Typography>
                        <Tooltip title="Add" aria-label="add" onClick={(e) => setAnchorElLunch(e.currentTarget)}>
                            <Fab color="secondary" size="small">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElLunch}
                            keepMounted
                            open={Boolean(anchorElLunch)}
                            onClose={() => setAnchorElLunch(null)}
                        >
                            <MenuItem onClick={() => setShowModal({ show: true, from: 'lunch' })}>Add Food</MenuItem>
                            <MenuItem onClick={handleClose}>Add Meal</MenuItem>
                        </Menu>
                    </div>
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
                    <div className={classes.meal_title}>
                        <Typography>Dinner</Typography>
                        <Tooltip title="Add" aria-label="add" onClick={(e) => setAnchorElDinner(e.currentTarget)}>
                            <Fab color="secondary" size="small">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElDinner}
                            keepMounted
                            open={Boolean(anchorElDinner)}
                            onClose={() => setAnchorElDinner(null)}
                        >
                            <MenuItem onClick={() => setShowModal({ show: true, from: 'dinner' })}>Add Food</MenuItem>
                            <MenuItem onClick={handleClose}>Add Meal</MenuItem>
                        </Menu>
                    </div>
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
                    <div className={classes.meal_title}>
                        <Typography>Snack</Typography>
                        <Tooltip title="Add" aria-label="add" onClick={(e) => setAnchorElSnack(e.currentTarget)}>
                            <Fab color="secondary" size="small">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorElSnack}
                            keepMounted
                            open={Boolean(anchorElSnack)}
                            onClose={() => setAnchorElSnack(null)}
                        >
                            <MenuItem onClick={() => setShowModal({ show: true, from: 'snacks' })}>Add Food</MenuItem>
                            <MenuItem onClick={handleClose}>Add Meal</MenuItem>
                        </Menu>
                    </div>
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
            <AddFoodModal showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}
