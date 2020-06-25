import { api } from "../config";

const SET_CALORIE_TRACKER_FOODS = 'SET_CALORIE_TRACKER_FOODS';
const ADD_CALORIE_TRACKER_FOOD = 'ADD_CALORIE_TRACKER_FOOD';
const SET_SELECTED_DATE = 'SET_SELECTED_DATE';


const setCalorieTrackerFoods = (value) => ({ action: SET_CALORIE_TRACKER_FOODS, value })
const setSelectedDate = (value) => ({ type: SET_SELECTED_DATE, value })
const addCalorieTrackerFood = (value) => ({ type: ADD_CALORIE_TRACKER_FOOD, value })

export const actions = {
    setSelectedDate,
    addCalorieTrackerFood
};


export const thunks = {

};

const addFoods = (userId, token, body) => {
    return async (dispatch, getState) => {
        const foods = await fetch(`${api}/users/${userId}/food`, {
            method: 'POST',
            headers: {
                'Content': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        try {
            if (foods.ok) {
                const res = await foods.json();

            }
        } catch (e) {
            console.log(e);
        }
    };
};

const initialState = { selectedDate: new Date() };

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_DATE: {
            return {
                ...state,
                selectedDate: action.value,
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
