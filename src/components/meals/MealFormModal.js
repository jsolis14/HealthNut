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
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '../../react-auth0-spa';
import { thunks, actions } from '../../store/meals';


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
        justifyContent: 'center'
    }
}));

export default function MealFormModal({ foods = [] }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mealArray, setMealArray] = useState([]);
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { user, getTokenSilently } = useAuth0();
    const errors = useSelector((state) => state.meals.errors);

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

        dispatch(thunks.postMeal(token, body))

        //fix problem
        if (errors.length === 0) {
            setOpen(false)
            setMealArray([])
            setName('')
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
                                Save Food
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >

    );
}
