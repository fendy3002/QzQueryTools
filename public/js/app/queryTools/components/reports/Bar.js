import React from 'react';
import lo from 'lodash';
import {Bar} from 'react-chartjs-2';
import LineData from './LineData.js';
import Colors from './Colors.js';

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
                borderColor: 'rgba(' + Colors[curOrder] + ',0.7)',
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
    if(layout.maxY){
        options.scales.yAxes[0].ticks = {
            ...options.scales.yAxes[0].ticks,
            max: layout.maxY
        };
    }
    if(layout.maxX){
        options.scales.xAxes[0].ticks = {
            ...options.scales.xAxes[0].ticks,
            max: layout.maxX
        };
    }

    return <Bar data={lineData} options={options}
        height={layout.height} width={layout.width}/>;
};

export default Elem;