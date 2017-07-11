import React from 'react';
import lo from 'lodash';
import {HorizontalBar} from 'react-chartjs-2';
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
                backgroundColor: 'rgba(' + Colors[curOrder] + ',0.4)',
                borderColor: 'rgba(' + Colors[curOrder] + ',0.6)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(' + Colors[curOrder] + ',0.7)',
                hoverBorderColor: 'rgba(' + Colors[curOrder] + ',1)',
                data: numericData[curOrder]
            };
        })
    };
    var options = {
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
                    minRotation: 0
                }
            }]
        },
        maintainAspectRatio: true
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

    return <HorizontalBar data={lineData} options={options} 
        height={layout.height} width={layout.width}/>;
};

export default Elem;