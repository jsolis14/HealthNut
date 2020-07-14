import React, { useEffect } from 'react';
import MealFormModal from './MealFormModal';
import { thunks as foodThunks } from '../../store/foods';
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from '../../react-auth0-spa';

export default function Meals() {
    const foods = useSelector((state) => state.foods.foods);
    const dispatch = useDispatch();
    const { user, getTokenSilently } = useAuth0();


    useEffect(() => {
        if (foods.length === 0) {
            fetchFoods()
        }
    })

    async function fetchFoods() {
        const token = await getTokenSilently()
        console.log(token)
        dispatch(foodThunks.getFoods(user.id, token))
    }

    return (
        <div>
            <MealFormModal />
        </div>
    )
}
