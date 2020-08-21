import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import { useAuth0 } from '../../react-auth0-spa';
import { api } from "../../config";
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    paper_container: {
        marginBottom: '20px',
    },
    chart: {
        padding: '10px',
        [theme.breakpoints.up('xl')]: {
            width: '1100px',
        },
        [theme.breakpoints.between('md', 'lg')]: {
            width: '700px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '330px',
        },
    },
    chart_form: {
        padding: '10px',
        [theme.breakpoints.up('xl')]: {
            width: '1100px',
        },
        [theme.breakpoints.between('md', 'lg')]: {
            width: '700px',
        },
        [theme.breakpoints.down('sm')]: {
            width: '330px',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    form_item: {
        margin: '10px 0px',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
        }

    },
    form_button: {
        margin: '5px'
    },
    info_text: {
        textAlign: 'center',
    }
}));

export default function WeightTracker() {
    const classes = useStyles();
    const [weights, setWeights] = useState([])
    const [weight, setWeight] = useState('')
    const [showForm, setShowForm] = useState(true)
    const { user, getTokenSilently } = useAuth0();
    const theme = useTheme();
    const date = useSelector((state) => state.calorieTracker.selectedDate);

    useEffect(() => {
        if (weights.length === 0) {
            getWeights()
        }
        getWeightByDay()

    }, [date])

    async function getWeights() {
        const userId = user.id
        const token = await getTokenSilently()

        const res = await fetch(`${api}/weight-tracker/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        const weightJson = await res.json()

        if (weightJson[1] === 200) {
            const weightArr = weightJson[0].map(weight => {
                return { x: weight.day, y: weight.weight }
            })
            setWeights(weightArr);
        }

    }


    async function getWeightByDay() {
        const userId = user.id
        const token = await getTokenSilently()

        const res = await fetch(`${api}/weight-tracker/user/${userId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 'day': [date.getFullYear(), date.getMonth() + 1, date.getDate()] }),
        })

        const data = await res.json();

        if (data[1] === 200) {
            setWeight(data[0].weight)
        } else if (data[1] === 204) {
            setWeight('')
        }
        setShowForm(true)
    }

    let ApexObj = {
        series: [{
            name: 'Weight',
            data: weights
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 289,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Weight Timeline',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return (val / 1).toFixed(0);
                    },
                },
                title: {
                    text: 'Weight'
                },
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return (val / 1).toFixed(0)
                    }
                }
            }
        },


    };


    const WeightForm = ({ showSkip }) => {
        const [formWeight, setFormWeight] = useState(weight)
        async function submitWeight() {
            const userId = user.id
            const token = await getTokenSilently()

            const res = await fetch(`${api}/weight-tracker/user/${userId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 'day': [date.getFullYear(), date.getMonth() + 1, date.getDate()], 'weight': formWeight }),
            })

            const data = await res.json();

            if (data[1] === 200) {
                setWeight(data[0].weight)
                getWeights()
                setShowForm(false)
            }
        }

        function weightChange(e) {
            let value = parseInt(e.target.value)
            if (!isNaN(value)) {
                setFormWeight(parseInt(e.target.value))
            } else {
                value = ''
                setFormWeight(value)
            }
        }

        return (
            <div className={classes.chart_form}>
                <div className={classes.form_item}>
                    {weight ? `Your weight for this date is ${weight}` : "You haven't logged your weight for this date yet"}
                </div>
                <div className={classes.form_item}>
                    <TextField
                        label="Weight"
                        id="filled-start-adornment"
                        value={formWeight}
                        onChange={weightChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">lbs</InputAdornment>,
                        }}

                    />
                </div>
                <div className={classes.form_item}>
                    <Button className={classes.form_button} variant="contained" onClick={() => setShowForm(false)}>{weight ? 'Go to chart ' : 'Skip logging for today'}</Button>
                    <Button className={classes.form_button} variant="contained" onClick={submitWeight} color="primary">
                        {weight ? 'Update Weight' : 'Log Weight'}
                    </Button>
                </div>
            </div>
        )
    }

    if (weights.length > 0) {
        return (


            <Paper className={classes.paper_container}>
                {showForm ? <WeightForm /> : <div id="chart" className={classes.chart}>
                    <ReactApexChart options={ApexObj.options} series={ApexObj.series} type="area" height={250} />
                </div>}

            </Paper>

        )
    } else {
        return (
            <Paper className={classes.paper_container}>
                <p className={classes.info_text}>Looks like you haven't logged your weight yet, log your weight to view the graph</p>
                <WeightForm />
            </Paper>
        )

    }



}
