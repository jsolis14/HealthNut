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

    function removeItem(item, array) {
        const index = array.indexOf(item)
        const remainingItems = [...array.slice(0, index), ...array.slice(index + 1, array.length)]
        return remainingItems
    }

    function removeServing() {
        if (count > 0) {
            setCount(count - 1)
            setMealArray(removeItem(food.id, mealArray))
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
