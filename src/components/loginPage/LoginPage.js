import React from 'react';
import Paper from '@material-ui/core/Paper';
import Features from './Features';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { useAuth0 } from '../../react-auth0-spa';
const useStyles = makeStyles((theme) => ({
    paper_container: {
        marginBottom: '20px',
    },
    login_page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    login_page__top: {
        backgroundColor: 'orange',
        width: '103%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    login_page__top_text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white'
    },
    top_text_header: {
        fontWeight: '700',
        fontFamily: 'Open Sans, sans-serif',

    },
    top_text: {
        margin: '5px 0px',
        textAlign: 'center'
    },
    screen_img: {
        width: '567px',
        [theme.breakpoints.down('sm')]: {
            width: '300px',
        },

    },
    contact_img: {
        width: '80px',
        margin: '0px 10px'
    },
    contact_me_container: {
        margin: '40px 0px 0px 0px'
    }
}));

export default function LoginPage() {
    const classes = useStyles();
    const { loginWithRedirect } = useAuth0();
    return (
        <div className={classes.login_page}>
            <div className={classes.login_page__top}>
                <div className={classes.login_page__top_text}>
                    <Typography className={classes.top_text_header, classes.top_text} variant='h4'>Track your nutrition and weight gain/loss</Typography>
                    <Typography className={classes.top_text} variant='h6'>log your foods, meals, and weight</Typography>
                    <Button className={classes.top_text} variant="contained" onClick={() => loginWithRedirect({})} color="primary">SIGN UP FOR FREE</Button>
                </div>
                <div>
                    <div>
                        <img className={classes.screen_img} src={require('../../images/healthnut-screen.png')} />
                    </div>
                </div>
            </div>
            <Features />
            <div className={classes.contact_me_container}>
                <Typography variant='h6'>Find me at:</Typography>
                <a href='https://www.linkedin.com/in/jesse-solis-3a8212185/'><img className={classes.contact_img} src={require('../../images/LI-In-Bug.png')} /></a>
                <a href='https://github.com/jsolis14/HealthNut'><img className={classes.contact_img} src={require('../../images/GitHub-Mark-120px-plus.png')} /></a>
                <a href='https://jsolis14.github.io/'><img className={classes.contact_img} src={require('../../images/portfolio-14-155223-removebg-preview.png')} /></a>
            </div>
        </div>

    )
}
