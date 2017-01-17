'use strict';

import Validator from "./validators/Validator";
import * as schema from "./schemas/request.json";
import JsonResponse from "./responses/JsonResponse";
import TextResponse from "./responses/TextResponse";
import * as HttpStatus from "http-status-codes";

const validator = new Validator(schema);

module.exports.apiai = (event, context, callback) => {

    console.log(event);
    callback(null, new JsonResponse({message: "hello world"}));

};
