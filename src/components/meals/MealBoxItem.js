import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    item_container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    button_container: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
    }
}));


export default function MealBoxItem({ food, setMealArray, mealArray }) {
    const classes = useStyles();
    const [count, setCount] = useState(0);

    function addServing() {
        setCount(count + 1)
        setMealArray([...mealArray, food.id])
    }

    function removeServing() {
        if (count > 0) {
            setCount(count - 1)
        }

    }

    return (
        <div className={classes.item_container}>
            <Typography>{`${food.name} (cal: ${food.total_cal})`}</Typography>
            <div className={classes.button_container}>
                <Button onClick={addServing} color='primary'>+</Button>
                <div >{count}</div>
                <Button onClick={removeServing} color='secondary'>-</Button>
            </div>
        </div>
    )
}
