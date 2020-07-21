import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import { useAuth0 } from '../../react-auth0-spa';
import { api } from "../../config";
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper_container: {
        marginBottom: '20px',
        width: '1100px',

    },
    chart: {
        padding: '10px',

    }
}));

export default function WeightTracker() {
    const classes = useStyles();
    const [weights, setWeights] = useState([])
    const { user, getTokenSilently } = useAuth0();

    useEffect(() => {
        if (weights.length === 0) {
            getWeights()
        }
    })

    async function getWeights() {
        const userId = user.id
        const token = await getTokenSilently()
        console.log(token)
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

    console.log(new Date())

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

    if (weights.length > 0) {
        return (
            <Paper className={classes.paper_container}>
                <div id="chart" className={classes.chart}>
                    <ReactApexChart options={ApexObj.options} series={ApexObj.series} type="area" height={350} />
                </div>
            </Paper>

        )
    } else {
        return (
            <div>
                Looks like you havent logged your weight
            </div>
        )

    }



}
