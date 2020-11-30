const express = require("express");
const app = express();
const redis = require("redis");
const fetch = require("node-fetch");
const path = require("path");
const methodOverride = require("method-Override");
const { query } = require("express");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));

const REDIS_PORT = process.env.PORT || 6379;
const EXPRESS_PORT = process.env.PORT || 3000;

//Creo el cliente de Redis
const client = redis.createClient(REDIS_PORT);

client.on("error", (error) => {
  console.log("Redis error encontrado!", error);
});

// Set Result
function setResult(url, data) {
  return `<h2>
      ${data}
    </h2>`;
}

//Solicitar data a la URL especificada
async function getPost(req, res, next) {
  if (/^(ftp|http|https):\/\/[^ "]+$/.test(req.query.url)) {
    try {
      console.log("Trayendo Data...");
      console.log(req.query.url);
      console.log(`URL encontrada en servidor`);
      const result = await fetch(req.query.url);

      const data = await result.json();

      const url = req.query.url;

      // Set data to Redis
      client.setex(url, 3600, JSON.stringify(data));

      res.send(setResult(url, JSON.stringify(data)));
    } catch {
      res.status(400).json({ error: err.message });
    }
  } else {
    console.log("URL incorecta");
    res.status(400).json("URL INCORRECTA");
  }
}

//Cache middleware
function cache(req, res, next) {
  const url = req.query.url;
  console.log(url);
  console.log("URL encontrada en cache");
  client.get(url, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResult(url, data));
    } else {
      next();
    }
  });
}

//Mostrar HTML con formulario
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./views/formulario.html"));
});

//Endpoint al que accedo
app.get("/proxy", cache, getPost);

//Reset cache
app.delete("/proxy/reset", (req, res) => {
  client.flushall(function (err, succeeded) {
    console.log("No content"); // will be true if successfull
    res.status(204).json("No Content");
  });
});

//Mostrar post desde el Formulario
app.post("/", (req, res) => {
  let urlInput = req.body.urlInput;
  res.redirect(urlInput);
});

app.listen(EXPRESS_PORT, () =>
  console.log(`Proxy escuchando en puerto ${EXPRESS_PORT}`)
);
