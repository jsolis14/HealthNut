import { api } from "../config";

const SET_AGE = 'SETAGE';
const SET_HEIGHT = 'SET_HEIGHT';
const SET_WEIGHT = 'SET_WEIGHT';
const SET_GENDER = 'SET_GENDER';
const SET_ACTIVITY_FACTOR = 'SET_ACTIVITY_FACTOR';
const SET_FITNESS_PLAN = 'SET_FITNESS_PLAN';

const setAge = (value) => ({ type: SET_AGE, value });
const setHeight = (value) => ({ type: SET_HEIGHT, value });
const setWeight = (value) => ({ type: SET_WEIGHT, value });
const setGender = (value) => ({ type: SET_GENDER, value });
const setActivityFactor = (value) => ({ type: SET_ACTIVITY_FACTOR, value })
const setFitnessPlan = (value) => ({ type: SET_FITNESS_PLAN, value })

export const actions = {
    setAge,
    setWeight,
    setHeight,
    setGender,
    setActivityFactor,
    setFitnessPlan,
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
        case SET_HEIGHT: {
            return {
                ...state,
                height: action.value
            }
        }
        case SET_WEIGHT: {
            return {
                ...state,
                weight: action.value
            }
        }
        case SET_GENDER: {
            return {
                ...state,
                gender: action.value
            }
        }
        case SET_ACTIVITY_FACTOR: {
            return {
                ...state,
                activityFactor: action.value
            }
        }
        case SET_FITNESS_PLAN: {
            return {
                ...state,
                fitnessPlan: action.value
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;
