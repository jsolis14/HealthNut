import React, { useState, useEffect } from 'react';
import { calculateCalorieLimit, calculateBMR, calculateDailyCalorieNeeds } from '../../tools';
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '@material-ui/core/Button';

import { actions } from '../../store/profile';

function CaloriePreview({ step, setStep, calorieLimit, calorieNeeds, percentage }) {


    // const dispatch = useDispatch();

    // const calorieLimit = useSelector((state) => state.profileInfo.calorieLimit);
    // const calorieNeeds = useSelector((state) => state.profileInfo.calorieNeeds);
    // const bmr = useSelector((state) => state.profileInfo.bmr);

    // const fitnessPlan = useSelector((state) => state.profileInfo.fitnessPlan);
    // const height = useSelector((state) => state.profileInfo.height);
    // const weight = useSelector((state) => state.profileInfo.weight);
    // const age = useSelector((state) => state.profileInfo.age);
    // const gender = useSelector((state) => state.profileInfo.gender);
    // const activityFactor = useSelector((state) => state.profileInfo.activityFactor);
    // const [percentage, setPercentage] = useState(0)

    // useEffect(() => {
    //     if (fitnessPlan && gender && weight && height && age && activityFactor) {
    //         dispatch(actions.setBMR(calculateBMR(gender, weight, height, age)))
    //         dispatch(actions.setCalorieNeeds(parseInt(calculateDailyCalorieNeeds(bmr, activityFactor))))
    //         dispatch(actions.setCalorieLimit(parseInt(calculateCalorieLimit(calorieNeeds, fitnessPlan))))

    //         setPercentage(calorieLimit / calorieNeeds)
    //     }


    // }, [calorieLimit, calorieNeeds, bmr])

    function handleNext() {
        console.log('submitted')
    }

    function handlePrev() {
        setStep(step - 1)
    }

    return (
        <>
            <div>
                <div>Your Daily Calorie Limis Is : {calorieLimit}</div>
                <div>Your Daily Calorie Needs Are : {calorieNeeds}</div>
            </div>
            <div>
                <ProgressBar progress={percentage * 100}
                    size={250}
                    strokeWidth={15}
                    circleOneStroke='#d9edfe'
                    circleTwoStroke='#7ea9e1'
                    numerator={calorieLimit}
                    divisor={calorieNeeds} />
            </div>
            <Button variant="contained" onClick={handlePrev}>
                Prev
            </Button>
            {/* <Button variant="contained" color="primary" onClick={handleNext}>
                Finish
            </Button> */}
        </>
    )
}

export default CaloriePreview;
