import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';


import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store/profile';

function ProfileInformation() {
    // const [value, setValue] = useState('female');
    // const [height, setHeight] = useState(5.11);
    // const [weight, setWeight] = useState(100);
    // const [age, setAge] = useState(24);

    const dispatch = useDispatch();
    const age = useSelector((state) => state.profileInfo.age);
    const height = useSelector((state) => state.profileInfo.height);
    const weight = useSelector((state) => state.profileInfo.weight);
    const gender = useSelector((state) => state.profileInfo.gender);

    // function handleAge(e) {
    //     useDispatch(actions.setAge(e.target.value))
    // }

    return (
        <>
            <div>
                <Input
                    id="standard-adornment-height"
                    value={height}
                    onChange={(e) => dispatch(actions.setHeight(e.target.value))}
                    endAdornment={<InputAdornment position="end">Ex 6'1"</InputAdornment>}
                    aria-describedby="standard-height-helper-text"
                    inputProps={{
                        'aria-label': 'height',
                    }}
                />
                <FormHelperText id="standard-height-helper-text">Height</FormHelperText>
            </div>
            <div>
                <Input
                    id="standard-adornment-weight"
                    value={weight}
                    onChange={(e) => dispatch(actions.setWeight(e.target.value))}
                    endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                    aria-describedby="standard-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
                <FormHelperText id="standard-weight-helper-text">Weight</FormHelperText>
            </div>
            <div>
                <Input
                    id="standard-adornment-age"
                    value={age}
                    onChange={(e) => dispatch(actions.setAge(e.target.value))}
                    endAdornment={<InputAdornment position="end">Years</InputAdornment>}
                    aria-describedby="standard-age-helper-text"
                    inputProps={{
                        'aria-label': 'age',
                    }}
                />
                <FormHelperText id="standard-age-helper-text">Age</FormHelperText>
            </div>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(e) => dispatch(actions.setGender(e.target.value))}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>
            </div>
        </>
    )
}

export default ProfileInformation;
