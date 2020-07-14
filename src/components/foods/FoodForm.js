import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { api } from '../../config';
import { useAuth0 } from '../../react-auth0-spa';
import { thunks } from '../../store/foods';
import { useDispatch, useSelector } from "react-redux";
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
    form_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cancel_button: {
        margin: '10px'
    }
}));

function FoodForm({ handleClose }) {
    const classes = useStyles();
    const [total_fat, set_total_fat] = useState('');
    const [saturated_fat, set_saturated_fat] = useState('');
    const [trans_fat, set_trans_fat] = useState('');
    const [cholesterol, set_cholesterol] = useState('');
    const [sodium, set_sodium] = useState('');
    const [total_carbs, set_total_carbs] = useState('');
    const [dietary_fiber, set_dietary_fiber] = useState('');
    const [sugars, set_sugars] = useState('');
    const [protein, set_protein] = useState('');
    const [total_cal, set_total_cal] = useState('');
    const [name, set_name] = useState('');
    const { user, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    async function handleSaveFood() {
        const user_id = user.id
        const body = {
            name,
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
            user_id
        }
        const userId = user.id
        const token = await getTokenSilently();
        dispatch(thunks.postFood(userId, token, body))

        //change this later
        handleClose(false)

    }

    return (

        <div className={classes.form_container}>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-name"
                    value={name}
                    required
                    onChange={e => set_name(e.target.value)}
                    aria-describedby="Enter name of food"
                    inputProps={{
                        'aria-label': 'name',
                    }}
                />
                <FormHelperText id="name-helper-text">Name</FormHelperText>
            </FormControl>
            <FormControl className={classes.margin, classes.withoutLabel, classes.textField}>
                <Input
                    id="standard-adornment-calories"
                    value={total_cal}
                    required
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
                    required
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
                    required
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
                    id="standard-adornment-sugars"
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
                    required
                    onChange={e => set_protein(e.target.value)}
                    endAdornment={<InputAdornment position="end">g</InputAdornment>}
                    aria-describedby="Enter protein"
                    inputProps={{
                        'aria-label': 'protein',
                    }}
                />
                <FormHelperText id="protein-helper-text">Protein</FormHelperText>
            </FormControl>
            <div className={classes.button_container}>
                <Button className={classes.cancel_button} onClick={handleClose} variant="contained" >
                    Cancel
            </Button>
                <Button onClick={handleSaveFood} variant="contained" color="primary">
                    Save Food
            </Button>
            </div>

        </div>

    )
}

export default FoodForm;
