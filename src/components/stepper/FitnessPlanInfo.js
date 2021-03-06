import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button_container: {
        width: '175px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignSelf: 'flex-end'
    }
}));
export default function FitnessPlanInfo({ fitnessPlan, setFitnessPlan, step, setStep }) {
    const [error, setError] = useState('')
    const classes = useStyles();
    function handleNext() {
        if (!fitnessPlan) {
            setError('Please select a fitness plan')
            return
        }
        setStep(step + 1)
    }

    function handlePrev() {
        setStep(step - 1)
    }

    return (
        <>
            {error ? <Alert severity="error">{error}</Alert> : <></>}
            <FormControl component="fieldset">
                <FormLabel component="legend">Fitness Plan</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={fitnessPlan} onChange={(e) => setFitnessPlan(e.target.value)}>
                    <FormControlLabel value="loose" control={<Radio />} label="Loose Wieght (1lb/week)" />
                    <FormControlLabel value="loose-fast" control={<Radio />} label="Loose Wieght fast (2lb/week)" />
                    <FormControlLabel value="maintain" control={<Radio />} label="Maintain Weight" />
                    <FormControlLabel value="gain" control={<Radio />} label="Gain Weight (1/lb week)" />

                </RadioGroup>
                <div className={classes.button_container}>
                    <Button variant="contained" onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                </div>
            </FormControl>


        </>
    );
}
