var db = require("../modules/index");

module.exports.getAll = (req, res) => {
  db.Tests.findAll()
    .then(result => {
      if (result.length) {
        console.log(
          "[" + "GET".green + "] Tests fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] No tests in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Tests fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};

module.exports.getOne = (req, res) => {
  db.Tests.findByPk(req.params.id)
    .then(result => {
      if (result) {
        console.log(
          "[" + "GET".green + "] Test fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] Test not found in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Test fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};

module.exports.getTestsQuestions = async (req, res, next) => {
  try {
    const currentTest = await db.Tests.findByPk(req.params.id);
    if (currentTest) {
      const questions = await currentTest.getTestsQuestions({ raw: true });
      if (questions.length) {
        console.log(
          "[" +
            "GET".green +
            "] Test's questions fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: questions
        });
      } else {
        console.log("[" + "GET".green + "] Test has no questions.");
        res.status(404).send({
          status: "not found"
        });
      }
    } else {
      console.log("[" + "GET".green + "] Test does not exist.");
      res.status(400).send({
        status: "bad request: test not found"
      });
    }
  } catch (error) {
    console.log(
      "[" + "GET".green + "] Test questions fetch created server error."
    );
    next(error);
  }
};