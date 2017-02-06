'use strict';


import ApiaiResponse from "./responses/ApiaiResponse";
import JsonResponse from "./responses/JsonResponse";
import * as HttpStatus from "http-status-codes";
import fetch from "node-fetch";

const datapointUri = process.env.DATAPOINT_URI;

module.exports.apiai = (event, context, callback) => {

    const request = JSON.parse(event.body);
    console.log("EVENT:\n",request);

    if (request.result.action == "weather.forecast") {
        let location = request.result.parameters["geo-city"];
        if (location) {
            Promise.resolve(fetch(datapointUri + "?location=" + encodeURIComponent(location))
                .then((res) => {
                    return res.json();
                }))
                .then((fcst) => {
                    console.log("FORECAST:\n",fcst);
                    callback(null, new JsonResponse(ApiaiResponse.fromForecast(fcst, "molab-datapoint-ls")));
                })
                .catch((err)=> {
                    callback(null, new JsonResponse({message: "error fulfilling request"}
                        , HttpStatus.INTERNAL_SERVER_ERROR));
                });
        } else {
            callback(null, new JsonResponse(
                {message: "missing location parameter"}
                , HttpStatus.BAD_REQUEST
            ));
        }
    } else {
        callback(null, new JsonResponse(
            {message: "expected action was 'weather.forecast' but got " + request.result.action}
            , HttpStatus.BAD_REQUEST
        ));
    }

};
