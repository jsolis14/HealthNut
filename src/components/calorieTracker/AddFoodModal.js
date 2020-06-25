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
}));

export default function AddFoodModal({ showModal, setShowModal }) {
    const classes = useStyles();
    const foods = useSelector((state) => state.foods.foods);
    const date = useSelector((state) => state.calorieTracker.selectedDate);
    const dispatch = useDispatch();
    const { user, getTokenSilently } = useAuth0();
    const [foodIds, setFoodIds] = useState([]);

    async function getUserDispatch() {
        const token = await getTokenSilently()
        const userId = user.id
        dispatch(thunks.getFoods(userId, token))
    }
    function handleModalClose() {
        setShowModal({ show: false, from: '' })
        setFoodIds([])
    }

    function handleSubmit() {
        setShowModal({ show: false, from: '' })
    }
    useEffect(() => {
        if (foods.length === 0 && user) {
            getUserDispatch()
        }
        // const foodObj = foods.map(food => { food.name: food.id })
    })
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
                                    {foods.map(food => <FoodCheckBoxItem key={food.id} food={food} foodIds={foodIds} setFoodIds={setFoodIds} />)}
                                </FormGroup>
                            </FormControl>
                        </div>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
