import React from 'react';
import lo from 'lodash';
import {Line} from 'react-chartjs-2';
import Colors from './Colors.js';

var getLabels = function(data){
    var label = [];
    for(var i = 0; i < data.length; i++){
        var currentData = data[i].data;
        var currentLabel = [];
        for(var j = 0; j < currentData.length; j++){
            if(currentData[j].label){
                currentLabel.push(currentData[j].label);
            }
            else if(currentData[j].text){
                currentLabel.push(currentData[j].text);
            }
            else if(currentData[j].name){
                currentLabel.push(currentData[j].name);
            }
            else{
                currentLabel.push(j.toString());
            }
        }
        label = label.concat(currentLabel);
    }
    return lo.uniqBy(label, k=> { return k; });
};
var getNumericData = function(labels, data){
    var result = [];
    for(var i = 0; i < data.length; i++){
        var currentData = data[i].data;
        var dataset = [];
        for(var j = 0; j < labels.length; j++){
            for(var k = 0; k < currentData.length; k++){
                var currentRow = currentData[k];
                if(currentRow.name && currentRow.name == labels[j]){
                    dataset.push(currentRow.value);
                }
                else if(currentRow.text && currentRow.text == labels[j]){
                    dataset.push(currentRow.value);
                }
                else if(currentRow.label && currentRow.label == labels[j]){
                    dataset.push(currentRow.value);
                }
            }
        }
        result.push(dataset);
    }
    return result;
};

var Elem = function({data, x, y}){
    var order = 0;
    var labels = getLabels(data);
    var numericData = getNumericData(labels, data);
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

    return <Line data={lineData} options={options}/>;
};

export default Elem;