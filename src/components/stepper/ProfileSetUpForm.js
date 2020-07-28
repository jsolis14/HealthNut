import React, { useState } from 'react';
import ProfileInformation from './ProfileInformation';
import ActivityInfo from './ActivityInfo';
import FitnessPLanInfo from './FitnessPlanInfo';
import CaloriePreview from './CaloriePreview';
import Button from '@material-ui/core/Button';
import { useAuth0 } from "../../react-auth0-spa";
import { makeStyles } from '@material-ui/core/styles';
import { actions } from '../../store/profile';
import { useDispatch, useSelector } from "react-redux";
import { calculateCalorieLimit, calculateBMR, calculateDailyCalorieNeeds } from '../../tools';
import { api } from '../../config';

const useStyles = makeStyles((theme) => ({
    form_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function ProfileSetUpForm() {
    const classes = useStyles();
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

        function handlePrev() {
            setStep(step - 1)
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

            window.location.href = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/foods' : 'https://master.d2v8iaichtof5r.amplifyapp.com/index.html'
        }
    }

    if (step === 1) {
        return (
            <div className={classes.form_container}>
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
            </div>

        )
    } else if (step === 2) {
        return (
            <div className={classes.form_container}>
                <ActivityInfo
                    activityFactor={activityFactor}
                    setActivityFactor={setActivityFactor}
                    setStep={setStep}
                    step={step}
                />
            </div>

        )
    } else if (step === 3) {
        return (
            <div className={classes.form_container}>
                <FitnessPLanInfo
                    fitnessPlan={fitnessPlan}
                    setFitnessPlan={setFitnessPlan}
                    step={step}
                    setStep={setStep}
                />
            </div>

        )
    } else if (step === 4) {
        const bmr = calculateBMR(gender, weight, height, age)
        const calorieNeeds = parseInt(calculateDailyCalorieNeeds(bmr, activityFactor))
        const calorieLimit = parseInt(calculateCalorieLimit(calorieNeeds, fitnessPlan))
        const percentage = calorieLimit / calorieNeeds

        // dispatch(actions.setCalorieLimit(calorieLimit))
        // dispatch(actions.setCalorieNeeds(calorieNeeds))

        return (
            <div className={classes.form_container}>
                <CaloriePreview
                    step={step}
                    setStep={setStep}
                    calorieLimit={calorieLimit}
                    calorieNeeds={calorieNeeds}
                    percentage={percentage}
                />
                <div>
                    <Button variant="contained" onClick={() => setStep(step - 1)}>
                        Prev
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleFinish}>
                        Finish
                    </Button>
                </div>

            </div>
        )
    }

}
