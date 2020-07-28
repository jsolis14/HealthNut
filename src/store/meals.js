import { api } from "../config";

const ADD_MEAL = 'ADD_MEAL';
const ADD_ERROR = 'ADD_ERROR';
const GET_MEALS = 'GET_MEALS';

const addMeal = (value) => ({ type: ADD_MEAL, value })
const addError = (value) => ({ type: ADD_ERROR, value })
const getMeals = (value) => ({ type: GET_MEALS, value })

export const actions = {
    addMeal,
    addError,
    getMeals,

};

const postMeal = (token, body) => {
    return async (dispatch, getState) => {
        const res = await fetch(`${api}/meal`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        const meal = await res.json();
        if (meal[1] === 200) {

            dispatch(addMeal(meal[0]))
        } else {

            dispatch(addError(meal[0]))
        }
    };
};

const fetchMeals = (token, userId) => {
    return async (dispatch, getState) => {
        const res = await fetch(`${api}/meal/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
        const meal = await res.json();
        if (meal[1] === 200) {

            dispatch(getMeals(meal[0]))
        } else {

            dispatch(addError(meal[0]))
        }
    };
};

export const thunks = {
    postMeal,
    fetchMeals,
};

const initialState = { meals: [], errors: [] };

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MEAL: {
            return {
                ...state,
                meals: [...state.meals, action.value]
            }
        }
        case ADD_ERROR: {
            return {
                ...state,
                errors: action.value
            }
        }
        case GET_MEALS: {
            return {
                ...state,
                meals: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
