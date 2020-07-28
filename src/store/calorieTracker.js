import { api } from "../config";

const SET_CALORIE_TRACKER_FOODS = 'SET_CALORIE_TRACKER_FOODS';
const ADD_CALORIE_TRACKER_FOOD = 'ADD_CALORIE_TRACKER_FOOD';
const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
const SET_FOOD_IDS = 'SET_FOOD_IDS';
const SET_MODIFIED_FOOD_IDS = 'SET_MODIFIED_FOOD_IDS';
const SET_BREAKFAST_FOODS = 'SET_BREAKFAST_FOODS';
const SET_LUNCH_FOODS = 'SET_LUNCH_FOODS';
const SET_DINNER_FOODS = 'SET_DINNER_FOODS';
const SET_SNACK_FOODS = 'SET_SNACK_FOODS';
const SET_BREAKFAST_IDS = 'SET_BREAKFAST_IDS';
const SET_LUNCH_IDS = 'SET_LUNCH_IDS';
const SET_DINNER_IDS = 'SET_DINNER_IDS';
const SET_SNACK_IDS = 'SET_SNACK_IDS';
const SET_TOTAL_CAL = 'SET_TOTAL_CAL';
const SET_TOTAL_PROTEIN = 'SET_TOTAL_PROTEIN';
const SET_TOTAL_CARBS = 'SET_TOTAL_CARBS';
const SET_TOTAL_FAT = 'SET_TOTAL_FAT';
const SET_BREAKFAST_MEALS = 'SET_BREAKFAST_MEALS';
const SET_LUNCH_MEALS = 'SET_LUNCH_MEALS';
const SET_DINNER_MEALS = 'SET_DINNER_MEALS';
const SET_SNACK_MEALS = 'SET_SNACK_MEALS';

const ADD_BREAKFAST_MEALS = 'ADD_BREAKFAST_MEALS';
const ADD_LUNCH_MEALS = 'ADD_LUNCH_MEALS';
const ADD_DINNER_MEALS = 'ADD_DINNER_MEALS';
const ADD_SNACK_MEALS = 'ADD_SNACK_MEALS';

const setSelectedDate = (value) => ({ type: SET_SELECTED_DATE, value })
const addCalorieTrackerFood = (value) => ({ type: ADD_CALORIE_TRACKER_FOOD, value })
const setFoodIds = (value) => ({ type: SET_FOOD_IDS, value })
const setModifiedFoodIds = (value) => ({ type: SET_MODIFIED_FOOD_IDS, value })
const setBreakfastFoods = (value) => ({ type: SET_BREAKFAST_FOODS, value })
const setLunchFoods = (value) => ({ type: SET_LUNCH_FOODS, value })
const setDinnerFoods = (value) => ({ type: SET_DINNER_FOODS, value })
const setSnackFoods = (value) => ({ type: SET_SNACK_FOODS, value })
const setBreakfastIds = (value) => ({ type: SET_BREAKFAST_IDS, value })
const setLunchIds = (value) => ({ type: SET_LUNCH_IDS, value })
const setDinnerIds = (value) => ({ type: SET_DINNER_IDS, value })
const setSnackIds = (value) => ({ type: SET_SNACK_IDS, value })
const setTotalCal = (value) => ({ type: SET_TOTAL_CAL, value })
const setTotalProtein = (value) => ({ type: SET_TOTAL_PROTEIN, value })
const setTotalCarbs = (value) => ({ type: SET_TOTAL_CARBS, value })
const setTotalFat = (value) => ({ type: SET_TOTAL_FAT, value })
const setBreakfastMeals = (value) => ({ type: SET_BREAKFAST_MEALS, value })
const setLunchMeals = (value) => ({ type: SET_LUNCH_MEALS, value })
const setDinnerMeals = (value) => ({ type: SET_DINNER_MEALS, value })
const setSnackMeals = (value) => ({ type: SET_SNACK_MEALS, value })

const addBreakfastMeals = (value) => ({ type: ADD_BREAKFAST_MEALS, value })
const addLunchMeals = (value) => ({ type: ADD_LUNCH_MEALS, value })
const addDinnerMeals = (value) => ({ type: ADD_DINNER_MEALS, value })
const addSnackMeals = (value) => ({ type: ADD_SNACK_MEALS, value })
export const actions = {
    setSelectedDate,
    addCalorieTrackerFood,
    setFoodIds,
    setModifiedFoodIds,
    setTotalCal,
    setBreakfastMeals,
    setLunchMeals,
    setDinnerMeals,
    setSnackMeals,
    setTotalCarbs,
    setTotalFat,
    setTotalProtein,
};

const updateMeals = (token, userId) => {
    return async (dispatch, getState) => {
        const date = getState().calorieTracker.selectedDate
        let total_cal = getState().calorieTracker.total_cal;
        let total_carbs = getState().calorieTracker.total_carbs;
        let total_protein = getState().calorieTracker.total_protein;
        let total_fat = getState().calorieTracker.total_protein;


        const res = await fetch(`${api}/calorie-tracker/user/${userId}/meals`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 'day': [date.getFullYear(), date.getMonth() + 1, date.getDate()] }),
        })

        const meals = await res.json()

        if (meals[1] === 200) {
            dispatch(setBreakfastMeals(meals[0].breakfast_meals))
            dispatch(setLunchMeals(meals[0].lunch_meals))
            dispatch(setDinnerMeals(meals[0].dinner_meals))
            dispatch(setSnackMeals(meals[0].snack_meals))

            meals[0].breakfast_meals.map(meal => {
                total_cal += meal.total_cal
                total_fat += meal.total_fat
                total_carbs += meal.total_carbs
                total_protein += meal.total_protein
            })

            meals[0].lunch_meals.map(meal => {
                total_cal += meal.total_cal
                total_fat += meal.total_fat
                total_carbs += meal.total_carbs
                total_protein += meal.total_protein
            })

            meals[0].dinner_meals.map(meal => {
                total_cal += meal.total_cal
                total_fat += meal.total_fat
                total_carbs += meal.total_carbs
                total_protein += meal.total_protein
            })

            meals[0].snack_meals.map(meal => {
                total_cal += meal.total_cal
                total_fat += meal.total_fat
                total_carbs += meal.total_carbs
                total_protein += meal.total_protein
            })

            dispatch(setTotalCarbs(total_carbs))
            dispatch(setTotalFat(total_fat))
            dispatch(setTotalCal(total_cal))
            dispatch(setTotalProtein(total_protein))
        }
    };
};

const updateFoods = (token, userId) => {
    return async (dispatch, getState) => {
        const date = getState().calorieTracker.selectedDate
        let total_cal = 0;
        let total_carbs = 0;
        let total_protein = 0;
        let total_fat = 0;


        const res = await fetch(`${api}/calorie-tracker/user/${userId}/foods`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 'day': [date.getFullYear(), date.getMonth() + 1, date.getDate()] }),
        })

        try {
            if (res.ok) {
                const food = await res.json();

                dispatch(setBreakfastFoods(food.breakfast_foods))
                dispatch(setLunchFoods(food.lunch_foods))
                dispatch(setDinnerFoods(food.dinner_foods))
                dispatch(setSnackFoods(food.snack_foods))

                dispatch(setBreakfastIds(food.breakfast_foods_ids))
                dispatch(setLunchIds(food.lunch_foods_ids))
                dispatch(setDinnerIds(food.dinner_foods_ids))
                dispatch(setSnackIds(food.snack_foods_ids))
                // dispatch(setCalorieTrackerFoods(foods))

                food.breakfast_foods.forEach(food => {
                    total_cal += food.food.total_cal * food.servings
                    total_protein += food.food.protein * food.servings
                    total_carbs += food.food.total_carbs * food.servings
                    total_fat += food.food.total_fat * food.servings
                })

                food.lunch_foods.forEach(food => {
                    total_cal += food.food.total_cal * food.servings
                    total_protein += food.food.protein * food.servings
                    total_carbs += food.food.total_carbs * food.servings
                    total_fat += food.food.total_fat * food.servings
                })

                food.dinner_foods.forEach(food => {
                    total_cal += food.food.total_cal * food.servings
                    total_protein += food.food.protein * food.servings
                    total_carbs += food.food.total_carbs * food.servings
                    total_fat += food.food.total_fat * food.servings
                })

                food.snack_foods.forEach(food => {
                    total_cal += food.food.total_cal * food.servings
                    total_protein += food.food.protein * food.servings
                    total_carbs += food.food.total_carbs * food.servings
                    total_fat += food.food.total_fat * food.servings
                })

                dispatch(setTotalCarbs(total_carbs))
                dispatch(setTotalFat(total_fat))

                dispatch(setTotalCal(total_cal))
                dispatch(setTotalProtein(total_protein))
                dispatch(updateMeals(token, userId))

            }
        } catch (e) {

        }
    };
};


const addFoods = (token, body) => {
    return async (dispatch, getState) => {
        body.food_ids = getState().calorieTracker.modifiedFoodIds
        const res = await fetch(`${api}/calorie-tracker/foods`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        })
        const prev_cal = getState().calorieTracker.total_cal;
        const prev_fat = getState().calorieTracker.total_fat;
        const prev_protein = getState().calorieTracker.total_protein;
        const prev_carbs = getState().calorieTracker.total_carbs;
        let prev_foods_cal = 0;
        let new_foods_cal = 0;
        let new_total_cal = 0;
        let prev_foods_carbs = 0;
        let new_foods_carbs = 0;
        let new_total_carbs = 0;
        let prev_foods_fat = 0;
        let new_foods_fat = 0;
        let new_total_fat = 0;
        let prev_foods_protein = 0;
        let new_foods_protein = 0;
        let new_total_protein = 0;
        const breakfast_foods = getState().calorieTracker.breakfast_foods;
        const lunch_foods = getState().calorieTracker.lunch_foods;
        const dinner_foods = getState().calorieTracker.dinner_foods;
        const snack_foods = getState().calorieTracker.snack_foods;
        try {
            if (res.ok) {
                const foods = await res.json();
                foods.foods.forEach(food => {
                    new_foods_cal += food.food.total_cal * food.servings
                    new_foods_carbs += food.food.total_carbs * food.servings
                    new_foods_protein += food.food.protein * food.servings
                    new_foods_fat += food.food.total_fat * food.servings
                })


                if (body.from === 'breakfast') {
                    breakfast_foods.forEach(food => {
                        prev_foods_cal += food.food.total_cal * food.servings
                        prev_foods_carbs += food.food.total_carbs * food.servings
                        prev_foods_fat += food.food.total_fat * food.servings
                        prev_foods_protein += food.food.protein * food.servings
                    })

                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_fat = prev_fat - prev_foods_fat + new_foods_fat;
                    new_total_protein = prev_protein - prev_foods_protein + new_foods_protein;
                    new_total_carbs = prev_carbs - prev_foods_carbs + new_foods_carbs;

                    debugger;
                    dispatch(setTotalCal(new_total_cal))
                    dispatch(setTotalFat(new_total_fat))
                    dispatch(setTotalProtein(new_total_protein))
                    dispatch(setTotalCarbs(new_total_carbs))
                    dispatch(setBreakfastFoods(foods.foods))
                    dispatch(setBreakfastIds(foods.food_ids))
                } else if (body.from === 'lunch') {
                    lunch_foods.forEach(food => {
                        prev_foods_cal += food.food.total_cal * food.servings
                        prev_foods_carbs += food.food.total_carbs * food.servings
                        prev_foods_fat += food.food.total_fat * food.servings
                        prev_foods_protein += food.food.protein * food.servings
                    })
                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_fat = prev_fat - prev_foods_fat + new_foods_fat;
                    new_total_protein = prev_protein - prev_foods_protein + new_foods_protein;
                    new_total_carbs = prev_carbs - prev_foods_carbs + new_foods_carbs;

                    dispatch(setTotalCal(new_total_cal))
                    dispatch(setTotalFat(new_total_fat))
                    dispatch(setTotalProtein(new_total_protein))
                    dispatch(setTotalCarbs(new_total_carbs))
                    dispatch(setLunchFoods(foods.foods))
                    dispatch(setLunchIds(foods.food_ids))
                } else if (body.from === 'dinner') {
                    dinner_foods.forEach(food => {
                        prev_foods_cal += food.food.total_cal * food.servings
                        prev_foods_carbs += food.food.total_carbs * food.servings
                        prev_foods_fat += food.food.total_fat * food.servings
                        prev_foods_protein += food.food.protein * food.servings
                    })
                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_fat = prev_fat - prev_foods_fat + new_foods_fat;
                    new_total_protein = prev_protein - prev_foods_protein + new_foods_protein;
                    new_total_carbs = prev_carbs - prev_foods_carbs + new_foods_carbs;

                    dispatch(setTotalCal(new_total_cal))
                    dispatch(setTotalFat(new_total_fat))
                    dispatch(setTotalProtein(new_total_protein))
                    dispatch(setTotalCarbs(new_total_carbs))
                    dispatch(setDinnerFoods(foods.foods))
                    dispatch(setDinnerIds(foods.food_ids))
                } else if (body.from === 'snack') {
                    snack_foods.forEach(food => {
                        prev_foods_cal += food.food.total_cal * food.servings
                        prev_foods_carbs += food.food.total_carbs * food.servings
                        prev_foods_fat += food.food.total_fat * food.servings
                        prev_foods_protein += food.food.protein * food.servings
                    })
                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_cal = prev_cal - prev_foods_cal + new_foods_cal;
                    new_total_fat = prev_fat - prev_foods_fat + new_foods_fat;
                    new_total_protein = prev_protein - prev_foods_protein + new_foods_protein;
                    new_total_carbs = prev_carbs - prev_foods_carbs + new_foods_carbs;

                    dispatch(setTotalCal(new_total_cal))
                    dispatch(setTotalFat(new_total_fat))
                    dispatch(setTotalProtein(new_total_protein))
                    dispatch(setTotalCarbs(new_total_carbs))
                    dispatch(setSnackFoods(foods.foods))
                    dispatch(setSnackIds(foods.food_ids))
                }
            }
        } catch (e) {

        }
    };
};

export const thunks = {
    addFoods,
    updateFoods,
    updateMeals
};

const initialState = {
    selectedDate: new Date(), breakfast_foods: [], lunch_foods: [],
    dinner_foods: [], snack_foods: [], breakfast_foods_ids: [],
    lunch_foods_ids: [], dinner_foods_ids: [], snack_foods_ids: [],
    modifiedFoodIds: [],
    breakfastMeals: [],
    lunchMeals: [],
    dinnerMeals: [],
    snackMeals: [],
    total_fat: 0,
    total_cal: 0,
    total_protein: 0,
    total_carbs: 0
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CALORIE_TRACKER_FOOD: {
            return {
                ...state,
                foods: action.value
            }
        }
        case SET_SELECTED_DATE: {
            return {
                ...state,
                selectedDate: action.value,
            }
        }
        case SET_CALORIE_TRACKER_FOODS: {
            return {
                ...state,
                foods: action.value,
                breakfast_foods_ids: action.value.breakfast_foods_ids,
            }
        }
        case SET_MODIFIED_FOOD_IDS: {
            return {
                ...state,
                modifiedFoodIds: action.value
            }
        }
        case SET_BREAKFAST_FOODS: {
            return {
                ...state,
                breakfast_foods: action.value
            }
        }
        case SET_LUNCH_FOODS: {
            return {
                ...state,
                lunch_foods: action.value
            }
        }
        case SET_DINNER_FOODS: {
            return {
                ...state,
                dinner_foods: action.value
            }
        }
        case SET_SNACK_FOODS: {
            return {
                ...state,
                snack_foods: action.value
            }
        }
        case SET_BREAKFAST_IDS: {
            return {
                ...state,
                breakfast_foods_ids: action.value
            }
        }
        case SET_LUNCH_IDS: {
            return {
                ...state,
                lunch_foods_ids: action.value
            }
        }
        case SET_DINNER_IDS: {
            return {
                ...state,
                dinner_foods_ids: action.value
            }
        }
        case SET_SNACK_IDS: {
            return {
                ...state,
                snack_foods_ids: action.value
            }
        }
        case SET_TOTAL_CAL: {
            return {
                ...state,
                total_cal: action.value
            }

        }
        case SET_TOTAL_PROTEIN: {
            return {
                ...state,
                total_protein: action.value
            }

        }
        case SET_TOTAL_CARBS: {

            return {
                ...state,
                total_carbs: action.value
            }

        }
        case SET_TOTAL_FAT: {

            return {
                ...state,
                total_fat: action.value
            }
        }
        case SET_BREAKFAST_MEALS: {

            return {
                ...state,
                breakfastMeals: action.value
            }
        }
        case SET_LUNCH_MEALS: {

            return {
                ...state,
                lunchMeals: action.value
            }
        }
        case SET_DINNER_MEALS: {

            return {
                ...state,
                dinnerMeals: action.value
            }
        }
        case SET_SNACK_MEALS: {

            return {
                ...state,
                snackMeals: action.value
            }
        }
        case ADD_BREAKFAST_MEALS: {

            return {
                ...state,
                breakfastMeals: [...state.breakfastMeals, action.value]
            }
        }
        case ADD_LUNCH_MEALS: {

            return {
                ...state,
                lunchMeals: [...state.lunchMeals, action.value]
            }
        }
        case ADD_DINNER_MEALS: {

            return {
                ...state,
                dinnerMeals: [...state.dinnerMeals, action.value]
            }
        }
        case ADD_SNACK_MEALS: {

            return {
                ...state,
                snackMeals: [...state.snackMeals, action.value]
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;
