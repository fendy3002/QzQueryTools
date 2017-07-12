import React from 'react';
import lo from 'lodash';
import {Line} from 'react-chartjs-2';
import Colors from './Colors.js';
import LineData from './LineData.js';

var Elem = function({data, x, y, layout}){
    var order = 0;
    var labels = LineData.getLabels(data);
    var numericData = LineData.getNumericData(labels, data);
    const lineData = {
        labels: labels,
        datasets: data.map(k=>{
            var curOrder = order++;
            return {
                label: k.label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(' + Colors[curOrder] + ',0.4)',
                borderColor: 'rgba(' + Colors[curOrder] + ',1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(' + Colors[curOrder] + ',1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(' + Colors[curOrder] + ',1)',
                pointHoverBorderColor: 'rgba(' + Colors[curOrder] + ',1)',
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointStyle: 'circle',
                pointHitRadius: 10,
                data: numericData[curOrder]
            };
        })
    };
    var options = {
        animation:false,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: 60,
                    minRotation: 0
                }
            }],
            yAxes: [{
                ticks: {
                    autoSkip: false,
                    maxRotation: 60,
                    minRotation: 0,
                    suggestedMin: 0
                }
            }]
        }
    };
    if(x){
        options.scales.xAxes[0] = {
            ...options.scales.xAxes[0],
            scaleLabel: {
                display: true,
                labelString: x
            }
        };
    }
    if(y){
        options.scales.yAxes[0] = {
            ...options.scales.yAxes[0],
            scaleLabel: {
                display: true,
                labelString: y
            }
        };
    }
    if(layout.max){
        options.scales.yAxes[0].ticks = {
            ...options.scales.yAxes[0].ticks,
            max: layout.max
        };
    }
    if(layout.start){
        options.scales.yAxes[0].ticks = {
            ...options.scales.yAxes[0].ticks,
            suggestedMin: layout.start
        };
    }

    return <Line data={lineData} options={options}
        height={layout.height} width={layout.width}/>;
};

export default Elem;