var db = require('../models/index');

module.exports.add = (req, res) => {
  db.Saves.create(req.body)
    .then(
      (result) => {
        console.log("[" + "POST".yellow + "] Save added successfully.")
        res.status(201).json(result)
      }
    )
    .catch(
      (err) => {
        console.log("[" + "POST".yellow + "] Adding save created server error.")
        res.json(err)
      }
    );
};

module.exports.update = (req, res) => {
  db.Saves.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(
      () => {
        console.log("[" + "PUT".blue + "] Save updated successfully.")
        res.status(200).send({
          status: "success"
        })
      }
    )
    .catch(
      (err) => {
        console.log("[" + "PUT".blue + "] Updating save created server error.")
        res.json(err)
      }
    );
};

module.exports.delete = (req, res) => {
  db.Saves.destroy({
    where: { id: req.params.id }
  })
    .then(
      () => {
        console.log("[" + "DEL".red + "] Save deleted successfully.")
        res.status(204).send()
      }
    )
    .catch(
      (err) => {
        console.log("[" + "DEL".red + "] Deleting save created server error.")
        res.json(err)
      }
    );
};