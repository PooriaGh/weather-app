const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicG91cmlhMTk5NyIsImEiOiJjazljeGwwbzQwMmUwM25xbzd3bnB6OXRzIn0.AiANhaZtNgMGn8gpoirxBA&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect loacation services!", undefined);
    } else if (body.features.length === 0) {
      callback("Loaction not found, try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
