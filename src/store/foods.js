import { api } from "../config";

const SET_FOODS = 'SET_FOODS';


const setFoods = (value) => ({ type: SET_FOODS, value })

export const actions = {
    setFoods
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
            console.log(e);
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
                console.log(food);
                dispatch(setFoods([food[0]]));
            }
        } catch (e) {
            console.log(e);

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
                foods: [...action.value, ...state.foods],
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
