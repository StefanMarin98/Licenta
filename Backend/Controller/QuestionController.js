var db = require("../modules/index");

module.exports.getOneRandom = (req, res) => {
  const test_id=req.session.testId;
  db.Questions.findOne({ order: 'random()' }, {where: {test_id}})
    .then(result => {
      if (result.length) {
        console.log(
          "[" + "GET".green + "] Question fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] No question in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Question fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};

module.exports.getOne = (req, res) => {
  db.Questions.findByPk(req.params.id)
    .then(result => {
      if (result) {
        console.log(
          "[" + "GET".green + "] Question fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: result
        });
      } else {
        console.log("[" + "GET".green + "] Question not found in database.");
        res.status(404).send({
          status: "not found"
        });
      }
    })
    .catch(() => {
      console.log("[" + "GET".green + "] Question fetch created server error.");
      res.status(500).send({
        status: "error"
      });
    });
};

module.exports.getQuestionAnswers = async (req, res, next) => {
  try {
    const currentQuestion = await db.Tests.findByPk(req.params.id);
    if (currentQuestion) {
      const questions = await currentQuestion.getQuestionAnswers({ raw: true });
      if (questions.length) {
        console.log(
          "[" +
            "GET".green +
            "] Question's answers fetched from database successfully."
        );
        res.status(200).send({
          status: "success",
          result: questions
        });
      } else {
        console.log("[" + "GET".green + "] Question has no answers.");
        res.status(404).send({
          status: "not found"
        });
      }
    } else {
      console.log("[" + "GET".green + "] Question does not exist.");
      res.status(400).send({
        status: "bad request: question not found"
      });
    }
  } catch (error) {
    console.log(
      "[" + "GET".green + "] Question answers fetch created server error."
    );
    next(error);
  }
};