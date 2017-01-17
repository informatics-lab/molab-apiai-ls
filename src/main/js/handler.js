'use strict';


import JsonResponse from "./responses/JsonResponse";

module.exports.apiai = (event, context, callback) => {

    console.log(event);
    callback(null, new JsonResponse({message: "hello world"}));

};
