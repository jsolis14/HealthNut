import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from '../ProgressBar/ProgressBar';

const useStyles = makeStyles((theme) => ({
    daily_overview_container: {
        width: '100%',
        height: '50%'
    },
}));

export default function DailyOverView() {
    const classes = useStyles();
    const calorieLimit = useSelector((state) => state.profileInfo.calorieLimit);
    const [dailyCalorieTotal, setDailyCalorieTotal] = useState(0);

    useEffect(() => {
        setDailyCalorieTotal(.25)
    })

    return (
        <div className={classes.daily_overview_container}>


            <div>
                <ProgressBar progress={dailyCalorieTotal * 100}
                    size={250}
                    strokeWidth={15}
                    circleOneStroke='#d9edfe'
                    circleTwoStroke='#7ea9e1'
                    numerator={1000}
                    divisor={calorieLimit} />
            </div>

        </div>
    )
}
