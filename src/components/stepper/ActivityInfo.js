import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store/profile';

function ActivityInfo() {
    const dispatch = useDispatch();
    const activityFactor = useSelector((state) => state.profileInfo.activityFactor);


    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Activity Level</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={activityFactor} onChange={(e) => dispatch(actions.setActivityFactor(e.target.value))}>
                <FormControlLabel value={"1.2"} control={<Radio />} label="sedentary (little or no exercise)" />
                <FormControlLabel value={"1.375"} control={<Radio />} label="lightly active (light exercise/sports 1-3 days/week)" />
                <FormControlLabel value={"1.55"} control={<Radio />} label="moderately active (moderate exercise/sports 3-5 days/week)" />
                <FormControlLabel value={"1.725"} control={<Radio />} label="very active (hard exercise/sports 6-7 days a week)" />
                <FormControlLabel value={"1.9"} control={<Radio />} label="extra active (very hard exercise/sports & physical job or 2x training)" />
            </RadioGroup>
        </FormControl >
    )
}

export default ActivityInfo;
