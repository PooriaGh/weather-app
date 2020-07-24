const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pouria Gholami",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Pouria Gholami",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message.",
    name: "Pouria Gholami",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "No address!" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forcast(latitude, longitude, (error, forcast) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forcast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/weather/location", (req, res) => {
  if (!(req.query.lat && req.query.long)) {
    return res.send({ error: "No address!" });
  }

  forcast(req.query.lat, req.query.long, (error, forcast) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      forcast,
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found!",
    name: "Pouria Gholami",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found!",
    name: "Pouria Gholami",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
