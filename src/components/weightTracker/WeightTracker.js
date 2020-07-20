import React from 'react';
import ReactApexChart from "react-apexcharts";

export default function WeightTracker() {
    console.log(new Date())
    let dates = [{
        x: "02-10-2017 GMT",
        y: 34
    },
    {
        x: "02-11-2017 GMT",
        y: 43
    },
    {
        x: "02-12-2017 GMT",
        y: 31
    },
    {
        x: "02-13-2017 GMT",
        y: 43
    },
    {
        x: "02-14-2017 GMT",
        y: 33
    },
    {
        x: "02-15-2017 GMT",
        y: 52
    }]
    let ApexObj = {
        series: [{
            name: 'Weight',
            data: dates
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
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


    return (


        <div id="chart">
            <ReactApexChart options={ApexObj.options} series={ApexObj.series} type="area" height={350} />
        </div>
    )
}
