const request = require("request");

const forecast = (lat, long, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fc954ce49b426c759cb7414150567528`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect, check your connection", undefined);
        } else if (body.length === 0) {
            callback("Location not found!", undefined);
        } else {
            callback(
                undefined,
                body.weather[0].main + ": " + body.weather[0].description
            );
        }
    });
};

module.exports = forecast;
