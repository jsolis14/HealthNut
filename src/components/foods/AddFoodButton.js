import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

export default function SimpleTooltips() {
    const classes = useStyles();

    return (
        <div>
            {/* <Tooltip title="Add" aria-label="add">
                <Fab size='small' color="secondary" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip> */}
            <button>add food</button>
        </div>
    );
}
