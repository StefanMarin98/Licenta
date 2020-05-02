const express = require('express')
const router = express.Router()

// Controllers
const usersController = require('../Controller/UserController.js')
const savesController = require('../Controller/SaveController.js')
const testController = require('../Controller/TestController.js')
const questionController = require('../Controller/QuestionController.js')
const answersController = require('../Controller/AnswerController.js')
const coursesController = require('../Controller/CourseController.js')

router.use((req, res, next) => {
    if (req.originalUrl === "/login" || req.originalUrl === "/register") {
        next();
    } else if (req.session.userId) {
        next();
    } else {
        res.status(403).send();
    }
});

// GET
router.get('/users/:id', usersController.getOne)
router.get('/users/:id/saves', usersController.getSaves)
router.get('/users/:id', usersController.checkUserLoginStatus)

router.get('/saves/:id', savesController.getOne)

router.get('/tests', testController.getAll)
router.get('/tests/:id', testController.getOne)
router.get('/tests/:id/questions', testController.getTestsQuestions)

router.get('/questions/:id', questionController.getOne)
router.get('/questions/:id', questionController.getOneRandom)
router.get('/questions/:id/answers', questionController.getQuestionAnswers)

router.get('/answers/:id', answersController.getOne)

router.get('/courses', coursesController.getAll)
router.get('/courses/:id', coursesController.getOne)

// POST

router.post('/users', usersController.add)
router.post('/users', usersController.login)
router.post('/users', usersController.logout)

router.post('/saves', savesController.add)

// PUT

router.put('/users/:id', usersController.update)
router.put('/saves/:id', savesController.update)

// DELETE

router.delete('/users/:id', usersController.delete)
router.delete('/saves/:id', savesController.delete)

module.exports = router