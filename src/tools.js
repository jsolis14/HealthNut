export function calculateBMR(gender, weight, height, age) {
    //Basal Metabolic Rate based on the Harris-Bennidict Formula
    let heightArr = height.split('.')
    console.log(heightArr);
    let inches = parseInt(heightArr[0]) * 12 + parseInt(heightArr[1])
    let bmr;
    if (gender === 'male') {
        bmr = 66 + (6.3 * weight) + (12.9 * inches) - (6.8 * age);
    } else {
        bmr = 655 + (4.3 * weight) + (4.7 * inches) - (4.7 * age);
    }

    return bmr;
}

export const calculateDailyCalorieNeeds = (bmr, activityFactor) => bmr * activityFactor;

export function calculateCalorieLimit(fitnessPlan, gender, weight, height, age, activityFactor) {
    const bmr = calculateBMR(gender, weight, height, age)
    console.log('bmr', bmr);
    const dailyCalorieNeeds = calculateDailyCalorieNeeds(bmr, parseInt(activityFactor))
    console.log('dailyCal', dailyCalorieNeeds);
    let weeklyThresh = dailyCalorieNeeds * 7
    if (fitnessPlan === 'loose-fast') {
        weeklyThresh -= 7000
    } else if (fitnessPlan === 'loose') {
        weeklyThresh -= 3500
    } else if (fitnessPlan === 'maintain') {
        weeklyThresh = weeklyThresh
    } else if (fitnessPlan === 'gain') {
        weeklyThresh += 3500
    }

    let dailyThresh = weeklyThresh / 7;

    //ACSM reccomends to not drop below 1200/1800 calories a day
    if (dailyThresh < 1200 && gender === 'female') {
        dailyThresh = 1200
    }
    if (dailyThresh < 1800 && gender === 'male') {
        dailyThresh = 1800
    }

    return dailyThresh;
}

console.log(calculateCalorieLimit('loose', 'male', 200, '5.6', 23, '1.375'))
