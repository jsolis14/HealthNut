import React, { useState, useEffect } from 'react';
import { calculateCalorieLimit, calculateBMR, calculateDailyCalorieNeeds } from '../../tools';
import { useSelector } from "react-redux";
import ProgressBarContainer from '../ProgressBar/ProgressBarContainer';
function CaloriePreview() {

    const [calorieLimit, setCalorieLimit] = useState(0);
    const [calorieNeeds, setCalorieNeeds] = useState(0);
    const [bmr, setBmr] = useState(0);
    const fitnessPlan = useSelector((state) => state.profileInfo.fitnessPlan);
    const height = useSelector((state) => state.profileInfo.height);
    const weight = useSelector((state) => state.profileInfo.weight);
    const age = useSelector((state) => state.profileInfo.age);
    const gender = useSelector((state) => state.profileInfo.gender);
    const activityFactor = useSelector((state) => state.profileInfo.activityFactor);
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        if (fitnessPlan && gender && weight && height && age && activityFactor) {
            setBmr(calculateBMR(gender, weight, height, age))
            setCalorieNeeds(calculateDailyCalorieNeeds(bmr, activityFactor))
            setCalorieLimit(calculateCalorieLimit(fitnessPlan, gender, weight, height, age, activityFactor))
        }


    }, [calorieLimit, calorieNeeds, bmr])

    return (
        <>
            <div>
                <div>Your Daily Calorie Limis Is : {calorieLimit}</div>
                <div>Your Daily Calorie Needs Are : {calorieNeeds}</div>
            </div>
            <div>
                <ProgressBarContainer />
            </div>
        </>
    )
}

export default CaloriePreview;
