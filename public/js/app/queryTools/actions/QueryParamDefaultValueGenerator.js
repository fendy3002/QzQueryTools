import lo from 'lodash';
import moment from 'moment';

var Service = (query) => {
    if(query.head && query.head.params){
        var result = {};
        lo.forOwn(query.head.params, (paramOpt, paramKey) => {
            if(!paramOpt){
                return null;
            }
            else if(typeof paramOpt === "string" || paramOpt instanceof String){
                return null
            }
            else{
                var defaultValueRaw = paramOpt.default || "";
                var defaultValue = null;
                if(defaultValueRaw.constructor === {}.constructor){
                    if(defaultValueRaw.type == "function"){
                        var func = new Function('p', defaultValueRaw.body);
                        defaultValue = func({
                            moment: moment
                        });
                    }
                }
                else{
                    defaultValue = defaultValueRaw;
                }

                result[paramKey] = defaultValue;
            }
        });
        return result;
    }
    else{
        return {};
    }
};
export default Service;