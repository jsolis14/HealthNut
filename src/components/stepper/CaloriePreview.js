import React, { useState, useEffect } from 'react';
import { calculateCalorieLimit, calculateBMR, calculateDailyCalorieNeeds } from '../../tools';
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from '../ProgressBar/ProgressBar';
import { actions } from '../../store/profile';

function CaloriePreview() {


    const dispatch = useDispatch();

    const calorieLimit = useSelector((state) => state.profileInfo.calorieLimit);
    const calorieNeeds = useSelector((state) => state.profileInfo.calorieNeeds);
    const bmr = useSelector((state) => state.profileInfo.bmr);

    const fitnessPlan = useSelector((state) => state.profileInfo.fitnessPlan);
    const height = useSelector((state) => state.profileInfo.height);
    const weight = useSelector((state) => state.profileInfo.weight);
    const age = useSelector((state) => state.profileInfo.age);
    const gender = useSelector((state) => state.profileInfo.gender);
    const activityFactor = useSelector((state) => state.profileInfo.activityFactor);
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        if (fitnessPlan && gender && weight && height && age && activityFactor) {
            dispatch(actions.setBMR(calculateBMR(gender, weight, height, age)))
            dispatch(actions.setCalorieNeeds(parseInt(calculateDailyCalorieNeeds(bmr, activityFactor))))
            dispatch(actions.setCalorieLimit(parseInt(calculateCalorieLimit(calorieNeeds, fitnessPlan))))

            setPercentage(calorieLimit / calorieNeeds)
            console.log(calorieLimit)
            console.log(calorieNeeds)
        }


    }, [calorieLimit, calorieNeeds, bmr])

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
        </>
    )
}

export default CaloriePreview;
