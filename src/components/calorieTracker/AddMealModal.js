import React, { useEffect, useState } from 'react';
import { api } from "../../config";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import FormGroup from '@material-ui/core/FormGroup';

import Button from '@material-ui/core/Button';


import { useDispatch, useSelector } from "react-redux";
import { thunks } from '../../store/foods';
import { thunks as calorieTrackerThunks, actions } from '../../store/calorieTracker'
import { useAuth0 } from '../../react-auth0-spa';
import FoodCheckBoxItem from './FoodCheckBoxItem';
import { actions as calorieTrackerActions } from '../../store/calorieTracker';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button_container: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cancel_button: {
        margin: '0px 5px'
    }
}));

export default function AddMealModal({ showMealModal, setShowMealModal }) {
    const classes = useStyles();
    const [value, setValue] = useState('')
    const meals = useSelector((state) => state.meals.meals);
    const date = useSelector((state) => state.calorieTracker.selectedDate);
    const [errors, setErrors] = useState([])
    const { user, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    function handleModalClose() {
        setShowMealModal({ show: false, from: '' })
        setValue('')
        setErrors('')
    }

    async function onSubmit() {
        const foodIdsStr = value.split(',')
        const food_ids = foodIdsStr.map(id => parseInt(id))
        const token = await getTokenSilently()

        const body = {
            meal_id: parseInt(value),
            from: showMealModal.from,
            day: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
            user_id: user.id
        }

        const res = await fetch(`${api}/calorie-tracker/meal`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        const meal = await res.json()

        if (meal[1] === 200) {
            //dispatch
            if (body.from === 'breakfast') {
                dispatch(calorieTrackerActions.setBreakfastMeals(meal[0]))
            } else if (body.from === 'lunch') {
                dispatch(calorieTrackerActions.setLunchtMeals(meal[0]))
            } else if (body.from === 'dinner') {
                dispatch(calorieTrackerActions.setDinnerMeals(meal[0]))
            } else if (body.from === 'snack') {
                dispatch(calorieTrackerActions.setSnackMeals(meal[0]))
            }
        } else {
            setErrors(meal[0])
        }
        console.log(body)
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showMealModal.show}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showMealModal.show}>
                    <div className={classes.paper}>
                        <div>
                            {errors.length > 0 ? <Alert severity="error">{errors}</Alert>
                                : <></>}
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e) => setValue(e.target.value)}>

                                    {meals.map(meal => {
                                        return <FormControlLabel key={meal.id} value={meal.id.toString()} control={<Radio />} label={`${meal.name} cal: ${meal.total_cal}`} />
                                    })}

                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.button_container}>
                            <Button onClick={handleModalClose} variant='contained'>Cancel</Button>
                            <Button onClick={onSubmit} color='primary' variant='contained' className={classes.cancel_button}>Submit</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
