const cors = require("cors");
const express = require("express");
const app = express();
const animals = require("./animals");
const partners = require("./partners");

app.use(cors());

app.get("/data/animals", (req, res) => {
  let newAnimals = animals.map((animal) => {
    const { name, img } = animal;
    return { name, img };
  });
  newAnimals = JSON.stringify(newAnimals);
  res.status(200).json(newAnimals);
});

app.get("/data/animals/:id", (req, res) => {
  const { id } = req.params;
  let animal = null;
  animal = animals.find((animal) => animal.id === Number(id));

  if (animal) {
    animal = JSON.stringify(animal);
    return res.status(200).json(animal);
  } else {
    return res
      .status(404)
      .json({ status: "failure", message: `No animal found with id ${id}` });
  }
});

app.get("/data/partners", (req, res) => {
  partners = JSON.stringify(partners);
  res.status(200).json(partners);
});

app.get("*", (req, res) => {
  res.status(404).json({ status: "Failure", message: "Resource not found" });
});

app.listen(5000, () => console.log("Listening on port 5000..."));
