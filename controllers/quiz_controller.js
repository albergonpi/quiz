var models = require('../models/models.js');

exports.show = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    var model = {quiz: quiz};
    res.render('quizes/show', model);
  });
};

exports.answer = function(req, res) {
  var resp = "Incorrecto";
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === quiz.respuesta)
      resp = "Correcto";
    var model = {
      quiz: quiz,
      respuesta: resp
      };
    res.render('quizes/answer', model);
  });
};

exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', {quizes: quizes});
    }
  );
}
