import React, { useState } from 'react';
import ProfileInformation from './ProfileInformation';
import ActivityInfo from './ActivityInfo';
import FitnessPLanInfo from './FitnessPlanInfo';
import CaloriePreview from './CaloriePreview';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "../../react-auth0-spa";
import { actions } from '../../store/profile';
import { useDispatch, useSelector } from "react-redux";
import { calculateCalorieLimit, calculateBMR, calculateDailyCalorieNeeds } from '../../tools';
import { api } from '../../config';

export default function ProfileSetUpForm() {
    const [step, setStep] = useState(1);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(null);
    const [activityFactor, setActivityFactor] = useState(null)
    const [fitnessPlan, setFitnessPlan] = useState(null)
    const { user, getTokenSilently } = useAuth0();
    const dispatch = useDispatch();

    async function handleFinish() {
        console.log('submitted')

        const bmr = calculateBMR(gender, weight, height, age)
        const calorieNeeds = parseInt(calculateDailyCalorieNeeds(bmr, activityFactor))
        const calorieLimit = parseInt(calculateCalorieLimit(calorieNeeds, fitnessPlan))

        const data = {
            id: user.id,
            height,
            weight,
            age,
            gender,
            activityFactor,
            fitnessPlan,
            bmr,
            calorieNeeds,
            calorieLimit
        }

        const token = await getTokenSilently();
        const res = await fetch(`${api}/users/updateinfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })

        if (res.ok) {

            window.location.href = 'http://localhost:3000/foods'
        }
    }

    if (step === 1) {
        return (
            <ProfileInformation
                nextStep={step}
                values={height, weight, age, gender}
                age={age}
                setAge={setAge}
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                gender={gender}
                setGender={setGender}
                setStep={setStep}
                step={step}
            />
        )
    } else if (step === 2) {
        return (
            <ActivityInfo
                activityFactor={activityFactor}
                setActivityFactor={setActivityFactor}
                setStep={setStep}
                step={step}
            />
        )
    } else if (step === 3) {
        return (
            <FitnessPLanInfo
                fitnessPlan={fitnessPlan}
                setFitnessPlan={setFitnessPlan}
                step={step}
                setStep={setStep}
            />
        )
    } else if (step === 4) {
        const bmr = calculateBMR(gender, weight, height, age)
        const calorieNeeds = parseInt(calculateDailyCalorieNeeds(bmr, activityFactor))
        const calorieLimit = parseInt(calculateCalorieLimit(calorieNeeds, fitnessPlan))
        const percentage = calorieLimit / calorieNeeds

        // dispatch(actions.setCalorieLimit(calorieLimit))
        // dispatch(actions.setCalorieNeeds(calorieNeeds))

        return (
            <>
                <CaloriePreview
                    step={step}
                    setStep={setStep}
                    calorieLimit={calorieLimit}
                    calorieNeeds={calorieNeeds}
                    percentage={percentage}
                />
                <Button variant="contained" color="primary" onClick={handleFinish}>
                    Finish
            </Button>
            </>
        )
    }

}
