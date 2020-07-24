import React, { useEffect } from 'react';
import MealFormModal from './MealFormModal';
import { thunks as foodThunks } from '../../store/foods';
import { thunks as mealThunks } from '../../store/meals';
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from '../../react-auth0-spa';
import AcordianMealItem from './AcordianMealItem';

export default function Meals() {
    const foods = useSelector((state) => state.foods.foods);
    const meals = useSelector((state) => state.meals.meals);

    const dispatch = useDispatch();
    const { user, getTokenSilently } = useAuth0();


    useEffect(() => {
        if (foods.length === 0) {
            fetchFoods()
        }
        if (meals.length === 0) {
            retrieveMeals()
        }
    }, [JSON.stringify(foods), JSON.stringify(meals)])

    async function fetchFoods() {
        const token = await getTokenSilently()
        console.log(token)
        dispatch(foodThunks.getFoods(user.id, token))
    }

    async function retrieveMeals() {
        const token = await getTokenSilently()
        console.log(token)
        dispatch(mealThunks.fetchMeals(token, user.id))
    }

    return (
        <div>
            <div>
                {meals.map(meal => {
                    return <AcordianMealItem key={meal.id} meal={meal} />
                })}
            </div>
            <MealFormModal foods={foods} />
        </div>
    )
}
