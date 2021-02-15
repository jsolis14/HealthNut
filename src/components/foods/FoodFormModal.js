import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FoodForm from './FoodForm';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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
        alignItems: 'center'
    }
}));

export default function SimpleModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.modal_container}>
            <div className={classes.button_container}>
                <Tooltip title="Add Food" aria-label="add" onClick={() => setOpen(true)}>
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
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <FoodForm handleClose={handleClose} />

                    </div>
                </Fade>
            </Modal>
        </div>

    );
}
