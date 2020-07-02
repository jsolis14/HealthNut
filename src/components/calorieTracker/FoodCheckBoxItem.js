import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { actions } from '../../store/calorieTracker';
import { useDispatch, useSelector } from "react-redux";
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

export default function FoodCheckBoxItem({ food, foodIds = [], showModal, setFoodIds }) {
    const [itemCount, setItemCount] = useState(0);
    const dispatch = useDispatch();
    const modified_foods_ids = useSelector((state) => state.calorieTracker.modifiedFoodIds);
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const classes = useStyles();

    useEffect(() => {
        onLoad()
    }, [])

    function onLoad() {
        if (modified_foods_ids.includes(food.id)) {
            const count = countOccurrences(modified_foods_ids, food.id)
            setItemCount(count)
        }
    }

    function addItem() {
        if (itemCount < 15) {
            let list = [...modified_foods_ids, food.id]
            // setFoodIds(list)
            // foodIds.push(food.id)
            dispatch(actions.setModifiedFoodIds(list))
            setItemCount(itemCount + 1)
        }


    }

    function removeItem() {
        if (itemCount > 0) {
            let list = modified_foods_ids
            const foodIdIndex = list.indexOf(food.id)

            list = [...list.slice(0, foodIdIndex), ...list.slice(foodIdIndex + 1, list.length)]

            // setFoodIds(list)
            dispatch(actions.setModifiedFoodIds(list))
            setItemCount(itemCount - 1)
        }


    }

    return (
        <div className={classes.item_container}>
            {/* <FormControlLabel
                control={<Checkbox name={`${food.name}`} checked={checked} value={food.id} onChange={() => setShowServings(!showServings)} />}
                label={`${food.name} cal:${food.total_cal}`
                }
            /> */}
            <Typography>{`${food.name} (cal: ${food.total_cal})`}</Typography>
            <div className={classes.button_container}>
                <Button onClick={addItem} color='primary'>+</Button>
                <div >{itemCount}</div>
                <Button onClick={removeItem} color='secondary'>-</Button>
            </div>
            {/* {showServings ? <TextFieldB
                id="standard-number"
                placeholder="Num Servings"
                onChange={(e) => handleNumChange(e)}
                onKeyDown={() => false}
                value={currentNum}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            /> : null} */}

        </div>
    )
}
