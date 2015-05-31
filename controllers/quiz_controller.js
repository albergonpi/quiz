exports.question = function(req, res){
  var model = {pregunta: '¿Cual es la capital de Italia?'};
  console.log(res.render);
  res.render('quizes/question', model);
};

exports.answer = function(req, res){
  var resp = "Incorrecto";
  if(req.query.respuesta === 'Roma')
    resp = "Correcto";
  var model = {respuesta: resp};
  res.render('quizes/answer', model);
};
