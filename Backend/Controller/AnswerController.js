var db = require("../models/index");

module.exports.getOne = (req, res) => {
  db.Answers.findByPk(req.params.id)
    .then(result => {
      if (result) {
        console.log(
          "[" + "GET".green + "] Answer fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] Answer not found in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Answer fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};