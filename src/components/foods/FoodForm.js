import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { api } from '../../config';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

function FoodForm() {
    const classes = useStyles();
    const [total_fat, set_total_fat] = useState('');
    const [saturated_fat, set_saturated_fat] = useState('');
    const [trans_fat, set_trans_fat] = useState('');
    const [cholesterol, set_cholesterol] = useState('');
    const [sodium, set_sodium] = useState('');
    const [total_carbs, set_total_carbs] = useState('');
    const [dietary_fiber, set_dietary_fiber] = useState('');
    const [sugars, set_sugars] = useState('')
    const [protein, set_protein] = useState('')
    const [total_cal, set_total_cal] = useState('')

    async function handleSaveFood() {
        const body = {
            total_fat,
            saturated_fat,
            trans_fat,
            cholesterol,
            sodium,
            total_carbs,
            dietary_fiber,
            sugars,
            protein,
            total_cal,
        }

        const res = await fetch(`${api}`)
    }

    return (
        <div>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-calories"
                    value={total_cal}
                    onChange={e => set_total_cal(e.target.value)}
                    endAdornment={<InputAdornment position="end">Cal</InputAdornment>}
                    aria-describedby="Enter total Calories"
                    inputProps={{
                        'aria-label': 'total calories',
                    }}
                />
                <FormHelperText id="total-calories-helper-text">Total Calories</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-total-fat"
                    value={total_fat}
                    onChange={e => set_total_fat(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter total Fat"
                    inputProps={{
                        'aria-label': 'total fat',
                    }}
                />
                <FormHelperText id="total-fat-helper-text">Total Fat</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-saturated-fat"
                    value={saturated_fat}
                    onChange={e => set_saturated_fat(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter Saturated Fat"
                    inputProps={{
                        'aria-label': 'saturated fat',
                    }}
                />
                <FormHelperText id="saturated-fat-helper-text">saturated Fat</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-trans-fat"
                    value={trans_fat}
                    onChange={e => set_trans_fat(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter trans Fat"
                    inputProps={{
                        'aria-label': 'trans fat',
                    }}
                />
                <FormHelperText id="trans-fat-helper-text">trans Fat</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-cholestorol"
                    value={cholesterol}
                    onChange={e => set_cholesterol(e.target.value)}
                    endAdornment={<InputAdornment position="end">mg</InputAdornment>}
                    aria-describedby="Enter cholesterol"
                    inputProps={{
                        'aria-label': 'cholesterol',
                    }}
                />
                <FormHelperText id="cholesterol-helper-text">cholesterol</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-sodium"
                    value={sodium}
                    onChange={e => set_sodium(e.target.value)}
                    endAdornment={<InputAdornment position="end">mg</InputAdornment>}
                    aria-describedby="Enter sodium"
                    inputProps={{
                        'aria-label': 'sodium',
                    }}
                />
                <FormHelperText id="sodium-helper-text">Sodium</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-total-carbs"
                    value={total_carbs}
                    onChange={e => set_total_carbs(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter total carbs"
                    inputProps={{
                        'aria-label': 'total carbs',
                    }}
                />
                <FormHelperText id="total-carbs-helper-text">Total Carbs</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-dietary-fiber"
                    value={dietary_fiber}
                    onChange={e => set_dietary_fiber(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter dietary fiber"
                    inputProps={{
                        'aria-label': 'dietary fiber',
                    }}
                />
                <FormHelperText id="dietary-fiber-helper-text">Dietary Fiber</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-total-fat"
                    value={sugars}
                    onChange={e => set_sugars(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter sugars"
                    inputProps={{
                        'aria-label': 'sugars',
                    }}
                />
                <FormHelperText id="sugars-helper-text">Sugars</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="protein-adornment-total-fat"
                    value={protein}
                    onChange={e => set_protein(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter protein"
                    inputProps={{
                        'aria-label': 'protein',
                    }}
                />
                <FormHelperText id="protein-helper-text">Protein</FormHelperText>
            </FormControl>
            <Button onClick={handleSaveFood} variant="contained" color="primary">
                Save Food
            </Button>
        </div>

    )
}

export default FoodForm;
