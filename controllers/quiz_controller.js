var models = require('../models/models.js');

exports.question = function(req, res){
  models.Quiz.findAll().then(function(quiz){
    var model = {pregunta: quiz[0].pregunta};
    console.log(res.render);
    res.render('quizes/question', model);
  });
};

exports.answer = function(req, res){
  var resp = "Incorrecto";
  models.Quiz.findAll().then(function(quiz){
    if(req.query.respuesta === quiz[0].respuesta)
      resp = "Correcto";
    var model = {respuesta: resp};
    res.render('quizes/answer', model);
  });
};
