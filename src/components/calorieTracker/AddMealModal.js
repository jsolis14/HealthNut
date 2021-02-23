import React, { useState } from 'react';
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
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import { thunks as actions } from '../../store/calorieTracker'
import { useAuth0 } from '../../react-auth0-spa';
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

    let total_cal = useSelector((state) => state.calorieTracker.total_cal);
    let total_protein = useSelector((state) => state.calorieTracker.total_protein);
    let total_carbs = useSelector((state) => state.calorieTracker.total_carbs);
    let total_fat = useSelector((state) => state.calorieTracker.total_fat);

    const [errors, setErrors] = useState([])
    const { user, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    function handleModalClose() {
        setShowMealModal({ show: false, from: '' })
        setValue('')
        setErrors('')
    }

    async function onSubmit() {
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
            console.log(meal[0])
            if (body.from === 'breakfast') {
                dispatch(calorieTrackerActions.addBreakfastMeals(meal[0]))
            } else if (body.from === 'lunch') {
                dispatch(calorieTrackerActions.addLunchMeals(meal[0]))
            } else if (body.from === 'dinner') {
                dispatch(calorieTrackerActions.addDinnerMeals(meal[0]))
            } else if (body.from === 'snack') {
                dispatch(calorieTrackerActions.addSnackMeals(meal[0]))
            }

            total_cal += meal[0].total_cal
            total_carbs += meal[0].total_carbs
            total_fat += meal[0].total_fat
            total_protein += meal[0].total_protein

            dispatch(calorieTrackerActions.setTotalCal(total_cal))
            dispatch(calorieTrackerActions.setTotalCarbs(total_carbs))
            dispatch(calorieTrackerActions.setTotalFat(total_fat))
            dispatch(calorieTrackerActions.setTotalProtein(total_protein))
            setShowMealModal({ from: '', show: false })
        } else {
            setErrors(meal[0])
        }

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
                                <FormLabel component="legend">Meals</FormLabel>
                                <RadioGroup aria-label="Meals" name="Meals1" value={value} onChange={(e) => setValue(e.target.value)}>

                                    {meals.length !== 0 ? meals.map(meal => {
                                        return <FormControlLabel key={meal.id} value={meal.id.toString()} control={<Radio />} label={`${meal.name} cal: ${meal.total_cal}`} />
                                    }) : <p>Looks like you don't have any meals yet, please add a meal from the "Meals" tab</p>}

                                </RadioGroup>
                            </FormControl>
                        </div>
                        {meals.length !== 0 ? <div className={classes.button_container}>
                            <Button onClick={handleModalClose} variant='contained'>Cancel</Button>
                            <Button onClick={onSubmit} color='primary' variant='contained' className={classes.cancel_button}>Submit</Button>
                        </div> : <></>}

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}
