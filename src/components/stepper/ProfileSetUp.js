import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ProfileInformation from './ProfileInformation';
import ActivityInfo from './ActivityInfo';
import FitnessPlanInfo from './FitnessPlanInfo';
import CaloriePreview from './CaloriePreview';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepper_content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    stepper: {
        background: '#fafafa'
    }
}));

function getSteps() {
    return ['Profile Information', 'Choose Activity Factor', 'Choose Fitness Plan', 'Preview Calorie Limit'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Please enter your information.';
        case 1:
            return 'How active are you?';
        case 2:
            return 'Choose a fitness plan.';
        case 3:
            return "Here's what we calculated.";
        default:
            return 'Unknown stepIndex';
    }
}

function handleSubmit() {
    console.log('Submitted')
}

function ProfileSetUp() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    let stepperInfo;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    if (activeStep === 0) {
        stepperInfo = <ProfileInformation />
    } else if (activeStep === 1) {
        stepperInfo = <ActivityInfo />
    } else if (activeStep === 2) {
        stepperInfo = <FitnessPlanInfo />
    } else {
        stepperInfo = <CaloriePreview />
    }

    return (
        <div className={classes.root}>
            <div >
                <div className={classes.stepper_content}>
                    {stepperInfo}
                </div>
                <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}

                </Stepper>
            </div>

            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                {activeStep < steps.length - 1 ? <Button variant="contained" color="primary" onClick={handleNext}>Next</Button> : <></>}
                                {activeStep === steps.length - 1 ? <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button> : <></>}

                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default ProfileSetUp;