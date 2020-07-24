import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from '../ProgressBar/ProgressBar';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import KitchenIcon from '@material-ui/icons/Kitchen';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const useStyles = makeStyles((theme) => ({
    daily_overview_container: {
        width: '100%',
        height: '50%'
    },
    paper_container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        borderTopRightRadius: '100px',
        width: '330px'
    },
    left_items_conainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    left_item: {
        width: '20%',
        margin: '25px'
    },
    grams_left: {
        fontSize: '0.9rem'
    },
    progress_container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    progress_calories_info: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
    },
    calorie_icons: {
        display: 'flex'
    },
    calorie_icon_container_eaten: {
        borderLeft: 'solid #7ea9e1',
        paddingLeft: '15px',
        marginBottom: '10px',
    },
    calorie_icon_container_burned: {
        borderLeft: 'solid red',
        paddingLeft: '15px',
        marginBottom: '10px',
    },
    main_container: {
        marginBottom: '20px',
        width: '330px',
        height: '289px'
    }
}));

export default function DailyOverView() {
    const classes = useStyles();
    const calorieLimit = useSelector((state) => state.profileInfo.calorieLimit);
    const total_cal = useSelector((state) => state.calorieTracker.total_cal);
    const total_carbs = useSelector((state) => state.calorieTracker.total_carbs);
    const total_protein = useSelector((state) => state.calorieTracker.total_protein);
    const total_fat = useSelector((state) => state.calorieTracker.total_fat);
    const [recCarbs, setRecCarbs] = useState(0)
    const [recProtein, setRecProtein] = useState(0)
    const [recFat, setRecFat] = useState(0)
    useEffect(() => {
        if (calorieLimit) {
            setRecCarbs(Math.ceil((calorieLimit * .55) / 4))
            setRecFat(Math.ceil((calorieLimit * .25) / 9))
            setRecProtein(Math.ceil((calorieLimit * .20) / 4))
        }
        // setDailyCalorieTotal(total_cal / calorieLimit)
    })

    // function calculateNutritionGoals(){
    //     // 55 carbs
    //     // 20 protein
    //     // 25 fat

    //     const rec_carbs =  ;
    //     const rec_protein = ;
    //     const rec_fat =

    // }

    function getText(total, rec) {
        const diff = rec - total;

        if (diff >= 0) {
            return `${Math.floor(diff)}g left `
        } else {
            return `${Math.floor(Math.abs(diff))}g over`
        }
    }

    return (
        <div className={classes.main_container}>
            <Paper className={classes.paper_container}>
                <div className={classes.left_items_conainer}>
                    <div className={classes.left_item}>
                        <Typography>Carbs</Typography>
                        {total_carbs / recCarbs < 1 ? <LinearProgress variant="determinate" color='primary' value={(total_carbs / recCarbs) * 100} /> : <LinearProgress variant="determinate" color='secondary' value={100} />}

                        <Typography className={classes.grams_left} > {getText(total_carbs, recCarbs)} </Typography>
                    </div>
                    <div className={classes.left_item}>
                        <Typography>Protein</Typography>
                        {total_protein / recProtein < 1 ? <LinearProgress variant="determinate" color='primary' value={(total_protein / recProtein) * 100} /> : <LinearProgress variant="determinate" color='secondary' value={100} />}

                        <Typography className={classes.grams_left} >{getText(total_protein, recProtein)}</Typography>
                    </div>
                    <div className={classes.left_item}>
                        <Typography>Fat</Typography>
                        {total_fat / recFat < 1 ? <LinearProgress variant="determinate" color='primary' value={(total_fat / recFat) * 100} /> : <LinearProgress variant="determinate" color='secondary' value={100} />}
                        <Typography className={classes.grams_left} >{getText(total_fat, recFat)}</Typography>
                    </div>
                </div>
                <div className={classes.progress_container}>
                    <div className={classes.progress_calories_info}>
                        <div className={classes.calorie_icon_container_eaten}>
                            <Typography>Eaten</Typography>
                            <div className={classes.calorie_icons}>
                                <KitchenIcon />
                                <Typography>{`${total_cal}`}</Typography>
                            </div>
                        </div>
                        <div className={classes.calorie_icon_container_burned}>
                            <Typography>Burned</Typography>
                            <div className={classes.calorie_icons}>
                                <WhatshotIcon />
                                <Typography>1200 Cal</Typography>
                            </div>
                        </div>
                    </div>
                    <ProgressBar progress={calorieLimit - total_cal > 0 ? (total_cal / calorieLimit) * 100 : 100}
                        size={150}
                        strokeWidth={15}
                        circleOneStroke='#d9edfe'
                        circleTwoStroke={calorieLimit - total_cal > 0 ? '#7ea9e1' : '#f50057'}
                        numerator={calorieLimit - total_cal > 0 ? calorieLimit - total_cal : `${Math.abs(calorieLimit - total_cal)}`}
                        divisor={calorieLimit - total_cal > 0 ? 'left' : 'over'} />
                </div>
            </Paper>
        </div>
    )
}
