exports.sessionExpired = function(req, res, next) {
  if(req.session.user){
    var now = new Date().getTime();
    if(req.session.user.expire > now){
      var expire = now + 2 * 60 * 1000;
      req.session.user.expire = expire;
    }else{
      delete req.session.user;
    }
  }
  next();
};

exports.loginRequired = function(req, res, next) {
  if(req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
};

exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

exports.create = function(req, res) {
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user){
    if(error) {
      req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
      res.redirect("/login");
      return;
    }
    var expire = new Date().getTime();
    expire +=  2 * 60 * 1000;
    req.session.user = {id:user.id, username:user.username, expire:expire};

    res.redirect(req.session.redir.toString());
  });
};

exports.destroy = function(req, res){
  delete req.session.user;
  res.redirect(req.session.redir.toString());
}
