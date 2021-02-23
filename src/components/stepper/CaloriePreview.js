import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';


function CaloriePreview({ calorieLimit, calorieNeeds, percentage }) {

    return (
        <>
            <div>
                <div>Your Daily Calorie Limit Is : {calorieLimit}</div>
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
