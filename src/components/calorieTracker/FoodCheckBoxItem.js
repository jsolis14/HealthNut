import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

export default function FoodCheckBoxItem({ food, foodIds, setFoodIds }) {
    const [showServings, setShowServings] = useState(false);
    const [lastCount, setLastCount] = useState(0)

    function handleNumChange(e) {
        let currentNum = parseInt(e.target.value) || 0
        let list = foodIds;
        const foodIdIndex = foodIds.indexOf(food.id)
        if (foodIdIndex === -1) {
            console.log('here')
            for (let i = 0; i < currentNum; i++) {
                list.push(food.id)
            }
            console.log(list)
        } else if (lastCount) {
            let diff = currentNum - lastCount;
            if (diff > 0) {
                //need to add diff ids
                console.log('diff> 0')
                console.log(diff)
                for (let i = 0; i < diff; i++) {
                    list.push(food.id)
                }
                console.log(list)
            } else if (diff < 0 && currentNum > -1) {
                list.sort(function (a, b) { return a - b });
                console.log(list)
                console.log(diff)
                const foodIdIndex = list.indexOf(food.id)
                console.log(list.slice(0, foodIdIndex))
                console.log(list.length)
                console.log(list.slice(foodIdIndex + Math.abs(diff), list.length))
                list = [...list.slice(0, foodIdIndex), ...list.slice(foodIdIndex + Math.abs(diff), list.length)]

                console.log(list)
            } else {
                // do nothing
            }
        }
        setLastCount(parseInt(e.target.value))
        setFoodIds(list)
    }

    return (
        <div key={food.id}>
            <FormControlLabel
                control={<Checkbox name={`${food.name}`} value={food.id} onChange={() => setShowServings(!showServings)} />}
                label={`${food.name} cal:${food.total_cal}`
                }
            />
            {showServings ? <TextField
                id="standard-number"
                placeholder="Num Servings"
                onChange={handleNumChange}
                value={lastCount}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
            /> : null}

        </div>
    )
}
