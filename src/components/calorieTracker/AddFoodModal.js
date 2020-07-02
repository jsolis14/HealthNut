import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import Button from '@material-ui/core/Button';


import { useDispatch, useSelector } from "react-redux";
import { thunks } from '../../store/foods';
import { thunks as calorieTrackerThunks, actions } from '../../store/calorieTracker'
import { useAuth0 } from '../../react-auth0-spa';
import FoodCheckBoxItem from './FoodCheckBoxItem';

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

export default function AddFoodModal({ showModal, setShowModal }) {
    const classes = useStyles();
    const [foodIds, setFoodIds] = useState();
    const foods = useSelector((state) => state.foods.foods);
    const date = useSelector((state) => state.calorieTracker.selectedDate);
    const breakfast_foods_ids = useSelector((state) => state.calorieTracker.breakfast_foods_ids);
    const lunch_foods_ids = useSelector((state) => state.calorieTracker.lunch_foods_ids);
    const dinner_foods_ids = useSelector((state) => state.calorieTracker.dinner_foods_ids);
    const snack_foods_ids = useSelector((state) => state.calorieTracker.snack_foods_ids);
    // const modified_foods_ids = useSelector((state) => state.calorieTracker.modifiedFoodIds);
    const dispatch = useDispatch();
    const { user, getTokenSilently } = useAuth0();
    // const [foodIds, setFoodIds] = useState([]);

    async function getUserDispatch() {
        const token = await getTokenSilently()
        const userId = user.id
        dispatch(thunks.getFoods(userId, token))
    }
    function handleModalClose() {
        setShowModal({ show: false, from: '' })
        dispatch(actions.setModifiedFoodIds([]))
        // setFoodIds([])
        // setFoodIds([])
    }
    // if (foods.length === 0 && user) {
    //     getUserDispatch()
    // }
    // handleLoad()
    useEffect(() => {
        if (foods.length === 0 && user) {

            getUserDispatch()
        }
        handleLoad();
        // const foodObj = foods.map(food => { food.name: food.id })
    }, [user, showModal])

    function handleLoad() {

        if (showModal.from === 'breakfast') {
            dispatch(actions.setModifiedFoodIds(breakfast_foods_ids))
        } else if (showModal.from === 'lunch') {
            dispatch(actions.setModifiedFoodIds(lunch_foods_ids))
        } else if (showModal.from === 'dinner') {
            dispatch(actions.setModifiedFoodIds(dinner_foods_ids))
        } else if (showModal.from === 'snack') {
            dispatch(actions.setModifiedFoodIds(snack_foods_ids))
        }
    }

    async function handleSubmit() {
        let token = await getTokenSilently();
        const user_id = user.id
        // let breakfast_foods = []
        // let lunch_foods = []
        // let dinner_foods = []
        // let snack_foods = []
        // if (showModal.from === 'breakfast') {
        //     foodIds = breakfast_foods_ids;
        // } else if (showModal.from === 'lunch') {
        //     foodIds = lunch_foods_ids;
        // } else if (showModal.from === 'dinner') {
        //     foodIds = dinner_foods_ids;
        // } else {
        //     foodIds = snack_foods_ids;
        // }

        const body = {
            day: [date.getFullYear(), date.getMonth() + 1, date.getDate()],
            user_id,
            from: showModal.from,
        }

        dispatch(calorieTrackerThunks.addFoods(token, body))
        setShowModal({ show: false, from: '' })
        dispatch(actions.setModifiedFoodIds([]))
    }


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showModal.show}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showModal.show}>
                    <div className={classes.paper}>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Assign responsibility</FormLabel>
                                <FormGroup>
                                    {foods.map(food => <FoodCheckBoxItem key={food.id} food={food} foodIds={foodIds} showModal={showModal} />)}
                                </FormGroup>
                            </FormControl>
                        </div>
                        <div className={classes.button_container}>
                            <Button onClick={handleModalClose} variant='contained'>Cancel</Button>
                            <Button onClick={handleSubmit} color='primary' variant='contained' className={classes.cancel_button}>Submit</Button>
                        </div>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
