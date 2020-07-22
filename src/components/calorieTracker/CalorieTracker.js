import React, { useState, useEffect } from 'react';
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store/calorieTracker';
import { thunks as mealThunks } from '../../store/meals';
import { thunks as calorieTrackerThunks } from '../../store/calorieTracker';
import { useAuth0 } from '../../react-auth0-spa';

import DailyOverView from './DailyOverView';
import AddButton from './AddButton';
import MealGrid from './MealGrid';
import WeightTracker from '../weightTracker/WeightTracker';
import UpdateWeightTracker from '../weightTracker/UpdateWeightTracker';
const useStyles = makeStyles((theme) => ({
    calendar_bar: {
        display: 'flex',
        justifyContent: 'center',
    },
    info_container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }
}));

export default function CalorieTracker() {
    const classes = useStyles();
    const date = useSelector((state) => state.calorieTracker.selectedDate);
    const meals = useSelector((state) => state.meals.meals);
    // console.log(date)
    const dispatch = useDispatch()
    // const [date, setDate] = useState(new Date())
    const [showAddFood, setShowAddFood] = useState(false);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { user, getTokenSilently } = useAuth0();

    useEffect(() => {
        if (user) {
            getFoodsbyDay()
        }
        if (meals.length === 0) {
            getUserMeals()
        }

        // calculateTotalCal()
    }, [date])

    async function getUserMeals() {
        const token = await getTokenSilently();
        const userId = user.id
        dispatch(mealThunks.fetchMeals(token, userId))
    }
    async function getFoodsbyDay() {
        const token = await getTokenSilently();

        const userId = user.id
        dispatch(calorieTrackerThunks.updateFoods(token, userId))
    }

    async function getMealsByDay() {
        const token = await getTokenSilently();

        const userId = user.id
        dispatch(calorieTrackerThunks.updateMeals(token, userId))
    }

    async function nextDate() {
        const tommorow = new Date(date)
        tommorow.setDate(date.getDate() + 1)
        dispatch(actions.setSelectedDate(tommorow))
    }

    function prevDate() {
        const yesterday = new Date(date)
        yesterday.setDate(date.getDate() - 1)
        dispatch(actions.setSelectedDate(yesterday))
    }
    return (
        <>
            <div className={classes.calendar_bar}>
                <NavigateBefore onClick={prevDate} />
                <div>{`${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</div>
                <NavigateNext onClick={nextDate} />
            </div>
            <div className={classes.info_container}>
                <DailyOverView />
                <WeightTracker />
            </div>

            <MealGrid />
            {/* <AddButton setShowAddFood={setShowAddFood} /> */}
            {}
        </>
    )
}
