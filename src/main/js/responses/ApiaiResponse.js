"use strict";

export default class ApiaiResponse {

    constructor() {

    }

    static fromForecast(fcst, source) {
        let r = new ApiaiResponse();
        r["speech"] = fcst.properties.forecast.text.local;
        r["displayText"] = fcst.properties.forecast.text.local;
        r["data"] = {};
        r["contextOut"] = [];
        r["source"] = source;
        return r;
    }

}