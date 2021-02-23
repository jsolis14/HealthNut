import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    input_container: {
        width: '250px'
    },
    input: {
        width: '100%'
    },
    input_half: {
        width: '100px'
    },
    input_duo: {
        width: '250px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function ProfileInformation({ age, weight, height, gender, setHeight, setAge, setGender, setWeight, setStep, step }) {
    const [error, setError] = useState('')
    const classes = useStyles();
    function handleNext() {
        setError('')

        const heightArr = height.split('.');
        const inches = heightArr[1];

        if (heightArr.length === 1 || height === '' || inches > 11 || inches < 0) {
            setError(['Please enter a valid height in the form of "6.0" for 6 feet 0 inches'])
            return
        }
        if (!age || age <= 0) {
            setError(['Please enter a valid age'])
            return
        }
        if (!weight || weight <= 0) {
            setError(['Please enter a valid weight'])
            return
        }
        if (!gender) {
            setError(['Please enter a valid gender'])
            return
        }
        setStep(step + 1)
    }

    return (
        <>
            {error ? <Alert severity="error">{error}</Alert> : <></>}
            <div className={classes.input_duo}>
                <div>
                    <Input
                        id="standard-adornment-height"
                        className={classes.input_half}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        endAdornment={<InputAdornment position="end">'</InputAdornment>}
                        aria-describedby="standard-height-helper-text"
                        inputProps={{
                            'aria-label': 'feet',
                        }}
                    />
                    <FormHelperText id="standard-height-helper-text">Feet</FormHelperText>
                </div>
                <div>
                    <Input
                        id="standard-adornment-height"
                        className={classes.input_half}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        endAdornment={<InputAdornment position="end">"</InputAdornment>}
                        aria-describedby="standard-height-helper-text"
                        inputProps={{
                            'aria-label': 'inches',
                        }}
                    />
                    <FormHelperText id="standard-height-helper-text">Inches</FormHelperText>
                </div>


            </div>
            <div className={classes.input_container}>
                <Input
                    id="standard-adornment-weight"
                    className={classes.input}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
            </div>
            <div className={classes.input_container}>
                <Input
                    id="standard-adornment-age"
                    className={classes.input}
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                    endAdornment={<InputAdornment position="end">Years</InputAdornment>}
                    aria-describedby="standard-age-helper-text"
                    inputProps={{
                        'aria-label': 'age',
                    }}
                />
                <FormHelperText id="standard-age-helper-text">Age</FormHelperText>
            </div>
            <div >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
            </div>
            <Button variant="contained" color="primary" onClick={handleNext}>
                Next
            </Button>
        </>
    )
}

export default ProfileInformation;
