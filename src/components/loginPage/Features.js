import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper_container: {
        marginBottom: '20px',
    },
    feature_container: {
        maxWidth: '900px',

    },
    feature_container__text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    feature_container__card: {
        width: '250px',
        height: '250px',
        margin: '10px 0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    feature_container__cards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: '5px 0px'
    },
    feature_card_pic: {
        width: '200px',
        height: '200px',

    },
    text: {
        margin: '10px 0px'
    },
    card_text: {
        color: '#5c5c5c',
        fontWeight: '700',
        textAlign: 'center'
    }
}));
export default function Features() {
    const classes = useStyles();

    return (
        <div className={classes.feature_container}>
            <div className={classes.feature_container__text}>
                <Typography className={classes.text} variant='h5'> FEATURES </Typography>
                <Typography className={classes.text} variant="body2"> Health Nut aims aims at making yourself healthier by giving you a diet plan based on your biometric info. By doing this
                we can tailor a diet plan to fit your needs, while giving you a visually appealing and easy to understand method to track your nutritional
                intake.
                </Typography>

                <Typography className={classes.text} variant="body2">We aim to make dieting easier and smarter</Typography>
            </div>
            <div className={classes.feature_container__cards}>
                <div className={classes.feature_container__card}>
                    <img className={classes.feature_card_pic} src={require('../../images/icon-easy-blue.png')} />
                    <Typography className={classes.card_text}>Streamlined Data Visualization</Typography>
                </div>
                <div className={classes.feature_container__card}>
                    <img className={classes.feature_card_pic} src={require('../../images/food-removebg-preview.png')} />
                    <Typography className={classes.card_text}>Track your caloric, fat, carb, and protien intake </Typography>
                </div>
                <div className={classes.feature_container__card}>
                    <img className={classes.feature_card_pic} src={require('../../images/meal.png')} />
                    <Typography className={classes.card_text}>Create meals from a group of foods</Typography>
                </div>
                <div className={classes.feature_container__card}>
                    <img className={classes.feature_card_pic} src={require('../../images/down-removebg-preview.png')} />
                    <Typography className={classes.card_text}>Track your weight as you log</Typography>
                </div>
                <div className={classes.feature_container__card}>
                    <img className={classes.feature_card_pic} src={require('../../images/phone-icon.png')} />
                    <Typography className={classes.card_text}>Responsive Design for logging on the go</Typography>
                </div>

            </div>

        </div>
    )
}
