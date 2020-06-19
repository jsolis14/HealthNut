import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { useDispatch, useSelector } from "react-redux";
import { actions } from '../../store/profile';

export default function FitnessPlanInfo() {
    const dispatch = useDispatch();
    const fitnessPlan = useSelector((state) => state.profileInfo.fitnessPlan);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Fitness Plan</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={fitnessPlan} onChange={(e) => dispatch(actions.setFitnessPlan(e.target.value))}>
                <FormControlLabel value="loose-fast" control={<Radio />} label="Loose Wieght (1lb/week)" />
                <FormControlLabel value="loose" control={<Radio />} label="Loose Wieght fast (2lb/week)" />
                <FormControlLabel value="maintain" control={<Radio />} label="Maintain Weight" />
                <FormControlLabel value="gain" control={<Radio />} label="Gain Weight (1/lb week)" />

            </RadioGroup>
        </FormControl>
    );
}
