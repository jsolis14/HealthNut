import React, { useState, useEffect } from 'react';
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
    const [date, setDate] = useState(new Date())
    const [showAddFood, setShowAddFood] = useState(false);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    function nextDate() {
        const tommorow = new Date()
        tommorow.setDate(date.getDate() + 1)
        setDate(tommorow)
    }

    function prevDate() {
        const yesterday = new Date()
        yesterday.setDate(date.getDate() - 1)
        setDate(yesterday)
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
            <AddButton setShowAddFood={setShowAddFood} />
            {}
        </>
    )
}
