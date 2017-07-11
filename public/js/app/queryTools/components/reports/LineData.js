import lo from 'lodash';

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
            var exists = false;
            for(var k = 0; k < currentData.length; k++){
                var currentRow = currentData[k];
                if(currentRow.name && currentRow.name == labels[j]){
                    dataset.push(currentRow.value);
                    exists = true;
                }
                else if(currentRow.text && currentRow.text == labels[j]){
                    dataset.push(currentRow.value);
                    exists = true;
                }
                else if(currentRow.label && currentRow.label == labels[j]){
                    dataset.push(currentRow.value);
                    exists = true;
                }
            }
            if(!exists){
                dataset.push(0);
            }
        }
        result.push(dataset);
    }
    return result;
};

export default {
    getLabels: getLabels,
    getNumericData: getNumericData
};