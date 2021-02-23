import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import MealBoxItem from './MealBoxItem';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '../../react-auth0-spa';
import { actions } from '../../store/meals';
import { api } from '../../config';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    addButton: {
        position: 'relative',
        top: '25px',
        display: 'flex',
        marginBottom: '10px',
        justifyContent: 'flex-end',
    },
    button_container: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '15px',
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'scroll',
        alignItems: 'center',
    }
}));

export default function MealFormModal({ foods = [] }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mealArray, setMealArray] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { user, getTokenSilently } = useAuth0();
    const [errors, setErrors] = useState([]);

    function close() {
        setOpen(false)
        setMealArray([])
        dispatch(actions.addError([]))
    }

    async function handleSubmit() {
        const token = await getTokenSilently()
        const body = {
            user_id: user.id,
            name,
            food_ids: mealArray,
        }


        const res = await fetch(`${api}/meal`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        const meal = await res.json();
        if (meal[1] === 200) {

            dispatch(actions.addMeal(meal[0]))
            setOpen(false)
            setMealArray([])
            setName('')
        } else {

            setErrors(meal[0])
        }
    }

    return (
        <div className={classes.modal_container}>
            <div className={classes.button_container}>
                <Tooltip title="Add Meal" aria-label="add" onClick={() => setOpen(true)}>
                    <Fab color="primary" size='small' className={classes.fab}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => close()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {foods.length > 0 ? <div>
                            {errors.length > 0 ? errors.map((error, idx) => <Alert key={idx} severity="error">{error}</Alert>) : <></>}
                            <TextField id="standard-basic" label="Name" onChange={(e) => setName(e.target.value)} />
                            {foods.map(food => {
                                return <MealBoxItem key={food.id} food={food} mealArray={mealArray} setMealArray={setMealArray} />
                            })}
                            <div className={classes.button_container}>
                                <Button className={classes.cancel_button} onClick={() => close()} variant="contained" >
                                    Cancel
                                </Button>
                                <Button onClick={() => handleSubmit()} variant="contained" color="primary">
                                    Save Meal
                                </Button>
                            </div>
                        </div> : <p>Looks like you don't have any foods yet, please add a food from the "Foods" tab</p>}
                    </div>
                </Fade>
            </Modal>
        </div >

    );
}
