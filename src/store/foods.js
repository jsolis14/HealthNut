import { api } from "../config";

const SET_FOODS = 'SET_FOODS';
const ADD_FOOD = 'ADD_FOOD';

const setFoods = (value) => ({ type: SET_FOODS, value })
const addFood = (value) => ({ type: ADD_FOOD, value })
export const actions = {
    setFoods,
    addFood
};


const getFoods = (userId, token) => {
    return async (dispatch, getState) => {
        const foods = await fetch(`${api}/users/${userId}/food`, {
            headers: {
                'Content': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        try {
            if (foods.ok) {
                const res = await foods.json();
                dispatch(setFoods(res));
            }
        } catch (e) {

        }
    };
};

const postFood = (userId, token, body) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetch(`${api}/food`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            })

            if (res.ok) {
                const food = await res.json();

                dispatch(addFood([food[0]]));
            } else {
                const foodMsg = await res.json()
                console.log(foodMsg)
            }
        } catch (e) {
            console.log(e)
        }
    };
};

export const thunks = {
    getFoods,
    postFood,
};

const initialState = { foods: [] };

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FOODS: {
            return {
                ...state,
                foods: [...action.value],
            }
        }
        case ADD_FOOD: {
            return {
                ...state,
                foods: [...action.value, ...state.foods]
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
