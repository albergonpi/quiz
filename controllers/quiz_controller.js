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
  var model = {quiz: req.quiz, errors: []};
  res.render('quizes/show', model);
};

exports.edit = function(req, res) {
  var model = {quiz: req.quiz, errors: []};
  res.render('quizes/edit', model);
};

exports.answer = function(req, res) {
  var resp = "Incorrecto";
  if(req.query.respuesta === req.quiz.respuesta)
    resp = "Correcto";
    var model = {
      quiz: req.quiz,
      respuesta: resp,
      errors: []
    };
    res.render('quizes/answer', model);
};

exports.index = function(req, res, next) {
  var criteria = req.query.search;
  var criteriaObject = {
    order: ['pregunta']
  };
  if(criteria){
    criteria = '%' + criteria.replace(/\s/g, '%') + '%';
    criteriaObject.where = ["pregunta like ?", criteria];
  }
  models.Quiz.findAll(criteriaObject).then(
    function(quizes) {
      res.render('quizes/index', {quizes: quizes, errors: []});
    }
  ).catch(
    function(error) {
      next(error);
    }
  );
};

exports.new = function(req, res){
  var quiz = models.Quiz.build({
    pregunta: "Pregunta",
    respuesta: "Respuesta"
  });
  res.render("quizes/new", {quiz: quiz, errors: []});
};

exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz.validate().then(function(err){
    if(err){
      res.render('quizes/new', {quiz : quiz, errors: err.errors});
    } else {
      quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){
        res.redirect('/quizes');
      });
    }
  });
};

exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz.validate().then(function(err){
    if(err){
      res.render('quizes/edit', {quiz : req.quiz, errors: err.errors});
    } else {
      req.quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){
        res.redirect('/quizes');
      });
    }
  });
};

exports.destroy = function(req, res, next){
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(error){
    next(error);
  });
};
