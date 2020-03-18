var db = require("../models/index");

module.exports.getAll = (req, res) => {
  db.Courses.findAll()
    .then(result => {
      if (result.length) {
        console.log(
          "[" + "GET".green + "] Courses fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] No courses in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Courses fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};

module.exports.getOne = (req, res) => {
  db.Courses.findByPk(req.params.id)
    .then(result => {
      if (result) {
        console.log(
          "[" + "GET".green + "] Course fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] Course not found in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Course fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};