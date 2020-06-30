import React, { useState, useEffect } from 'react';
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store/calorieTracker';
import { thunks as calorieTrackerThunks } from '../../store/calorieTracker';
import { useAuth0 } from '../../react-auth0-spa';

import DailyOverView from './DailyOverView';
import AddButton from './AddButton';
import MealGrid from './MealGrid';

const useStyles = makeStyles((theme) => ({
    calendar_bar: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default function CalorieTracker() {
    const classes = useStyles();
    const date = useSelector((state) => state.calorieTracker.selectedDate);

    const dispatch = useDispatch()
    // const [date, setDate] = useState(new Date())
    const [showAddFood, setShowAddFood] = useState(false);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { user, getTokenSilently } = useAuth0();

    useEffect(() => {
        if (user) {
            getFoodsbyDay()
        }
        // calculateTotalCal()
    }, [date, user])

    async function getFoodsbyDay() {
        const token = await getTokenSilently();
        console.log(user)
        const userId = user.id
        await dispatch(calorieTrackerThunks.updateFoods(token, userId))

    }
    async function nextDate() {
        const tommorow = new Date()
        tommorow.setDate(date.getDate() + 1)
        dispatch(actions.setSelectedDate(tommorow))

        // const token = await getTokenSilently();
        // console.log(user)
        // const userId = user.id
        // dispatch(calorieTrackerThunks.updateFoods(token, userId))

    }

    function prevDate() {
        const yesterday = new Date()
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
            <DailyOverView />
            <MealGrid />
            {/* <AddButton setShowAddFood={setShowAddFood} /> */}
            {}
        </>
    )
}
