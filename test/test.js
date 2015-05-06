var assert = require("assert");


describe('interceptor', function(){



    describe('test first preProcess return false', function(){
        var data = {value : 1};
        var processer = [
            {
                preProcess : function (data){
                    data.value = 2; return false;
                } ,
                process : function (){
                    data.value = 3; return false;
                }
            }]
        var interceptor = require("./../index");


        interceptor(processer).invoke(data);

        assert.equal(data.value , 2);
    })




    describe('test first process return true', function(){
        var data = {value : 1};
        var processer = [
            {
                preProcess : function (data){
                    data.value = 2; return true;
                } ,
                process : function (){
                    data.value = 3; return false;
                }
            },

            {
                preProcess : function (data){

                    data.value = 5; return true;
                } ,
                process : function (){
                    data.value = 6; return false;
                }
            },

        ]
        var interceptor = require("./../index");


        interceptor(processer).invoke(data);

        assert.equal(data.value , 3);
    })


    describe('test one of  preProcess return false', function(){
        var data = {value : 1};
        var processer = [
            {
                preProcess : function (data){
                    data.value = 2; return true;
                } ,
                process : function (){
                    data.value = 3; return true;
                }
            },

            {
                preProcess : function (data){

                    data.value = "test"; return false;
                } ,
                process : function (){
                    data.value = 6; return true;
                }
            },

        ]
        var interceptor = require("./../index");


        interceptor(processer).invoke(data);

        assert.equal(data.value , "test");
    })



    describe('test one of  process return false', function(){
        var data = {value : 1};
        var processer = [
            {
                preProcess : function (data){
                    data.value = 2; return true;
                } ,
                process : function (){
                    data.value = 3; return true;
                }
            },

            {
                preProcess : function (data){

                    data.value = "test"; return true;
                } ,
                process : function (){
                    data.value = 8; return false;
                }
            },

            {
                preProcess : function (data){

                    data.value = "test"; return true;
                } ,
                process : function (){
                    data.value = "test2"; return true;
                }
            }

        ]
        var interceptor = require("./../index");


        interceptor(processer).invoke(data);

        assert.equal(data.value , 8);
    })


    describe('test go end', function(){
        var data = {value : 1};
        var processer = [
            {
                preProcess : function (data){
                    data.value = 2; return true;
                } ,
                process : function (){
                    data.value = 3; return true;
                }
            },

            {
                preProcess : function (data){

                    data.value = "test"; return true;
                } ,
                process : function (){
                    data.value = 8; return true;
                }
            },

            {
                preProcess : function (data){

                    data.value = "test"; return true;
                } ,
                process : function (){
                    data.value = "test2"; return true;
                }
            }

        ]
        var interceptor = require("./../index");


        interceptor(processer).invoke(data);

        assert.equal(data.value , "test2");
    })
})