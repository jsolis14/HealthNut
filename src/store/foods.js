import { api } from "../config";


export const actions = {

};

export const thunks = {

};

const initialState = [];

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_AGE: {
            return {
                ...state,
                age: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
