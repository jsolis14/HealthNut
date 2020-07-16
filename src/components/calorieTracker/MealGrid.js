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
import FoodItem from './FoodItem';
import { useDispatch, useSelector } from "react-redux";
import AddMealModal from './AddMealModal';
import AcordianMealItem from '../meals/AcordianMealItem';
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
    const [showMealModal, setShowMealModal] = useState({ show: false, from: '' });
    const breakfastFoods = useSelector((state) => state.calorieTracker.breakfast_foods);
    const lunchFoods = useSelector((state) => state.calorieTracker.lunch_foods);
    const dinnerFoods = useSelector((state) => state.calorieTracker.dinner_foods);
    const snackFoods = useSelector((state) => state.calorieTracker.snack_foods);
    const breakfastMeals = useSelector((state) => state.calorieTracker.breakfastMeals);
    const lunchMeals = useSelector((state) => state.calorieTracker.lunchMeals);
    const dinnerMeals = useSelector((state) => state.calorieTracker.dinnerMeals);
    const snackMeals = useSelector((state) => state.calorieTracker.snackMeals);

    const handleClose = () => {
        setAnchorElBreakfast(null);
    };

    // function handleAddFood() {
    //     setShowModal({show:true, from})
    // }

    return (
        <div>
            <Grid container spacing={3} >
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
                            <MenuItem onClick={() => setShowMealModal({ show: true, from: 'breakfast' })}>Add Meal</MenuItem>
                        </Menu>
                    </div>
                    {/* list of food items */}
                    {breakfastFoods.map(food => {
                        return <FoodItem key={food.food.id} food={food} />
                    })}
                    {breakfastMeals.map(meal => {
                        return <AcordianMealItem key={meal.id} meal={meal} />
                    })}
                    {breakfastFoods.length === 0 && breakfastMeals.length === 0 ? <Paper className={classes.paper}>Looks Like you haven't had breakfast yet</Paper> : <></>}
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
                            <MenuItem onClick={() => setShowMealModal({ show: true, from: 'lunch' })}>Add Meal</MenuItem>
                        </Menu>
                    </div>
                    {/* list of food items */}
                    {lunchFoods.map(food => {
                        return <FoodItem key={food.food.id} food={food} />
                    })}
                    {lunchMeals.map(meal => {
                        return <AcordianMealItem key={meal.id} meal={meal} />
                    })}
                    {lunchFoods.length === 0 && lunchMeals.length === 0 ? <Paper className={classes.paper}>Looks Like you haven't had lunch yet</Paper> : <></>}
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
                            <MenuItem onClick={() => setShowMealModal({ show: true, from: 'dinner' })}>Add Meal</MenuItem>
                        </Menu>
                    </div>
                    {/* list of food items */}
                    {dinnerFoods.map(food => {
                        return <FoodItem key={food.food.id} food={food} />
                    })}
                    {dinnerMeals.map(meal => {
                        return <AcordianMealItem key={meal.id} meal={meal} />
                    })}
                    {dinnerFoods.length === 0 && dinnerMeals.length === 0 ? <Paper className={classes.paper}>Looks Like you haven't had dinner yet</Paper> : <></>}
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
                            <MenuItem onClick={() => setShowModal({ show: true, from: 'snack' })}>Add Food</MenuItem>
                            <MenuItem onClick={() => setShowMealModal({ show: true, from: 'snack' })}>Add Meal</MenuItem>
                        </Menu>
                    </div>
                    {/* list of food items */}
                    {snackFoods.map(food => {
                        return <FoodItem key={food.food.id} food={food} />
                    })}
                    {snackMeals.map(meal => {
                        return <AcordianMealItem key={meal.id} meal={meal} />
                    })}
                    {snackFoods.length === 0 && snackMeals.length === 0 ? <Paper className={classes.paper}>Looks Like you haven't had snack yet</Paper> : <></>}
                </Grid>
            </Grid>
            <AddFoodModal showModal={showModal} setShowModal={setShowModal} />
            <AddMealModal showMealModal={showMealModal} setShowMealModal={setShowMealModal} />
        </div>
    )
}
