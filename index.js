var _ = require("underscore");



var iteratee = function (array , cb){
    var i, length, result;
    for (i = 0, length = array.length; i < length; i++) {
        result = cb(array[i] , i);
        if(result === false){
            return ;
        }
    }
}

var invoker = function (array , data){

    iteratee(array , function (value , key){

        var result = true ;
        value.preProcess && (result = value.preProcess(data));

        if(result === false){
            return false;
        }

        result = value.process(data);

        if(result === false){
            return false;
        }

    })
}

module.exports = function (config  ){

    var interceptors = [];

    if(_.isArray(config)){
        interceptors = config;
    }

    return {
        invoke : function (data){
            invoker(interceptors , data);
        },
        add : function (interceotpr){
            if(_.isArray(config)){
                interceptors.concat(config);
            }else {
                interceptors.push(interceotpr);
            }
        },
        remove : function (index){
            interceptors.splice(index , 1);
        }
    }
}