var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz){
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId=' + quizId));
      }
    }
  ).catch(
    function(error) {
      next(error);
    }
  );
}

exports.show = function(req, res) {
  var model = {quiz: req.quiz};
  res.render('quizes/show', model);
};

exports.answer = function(req, res) {
  var resp = "Incorrecto";
  if(req.query.respuesta === req.quiz.respuesta)
    resp = "Correcto";
    var model = {
      quiz: req.quiz,
      respuesta: resp
    };
    res.render('quizes/answer', model);
};

exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', {quizes: quizes});
    }
  ).catch(
    function(error) {
      next(error);
    }
  );
}
