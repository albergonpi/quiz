var models = require('../models/models.js');

exports.show = function(req, res) {
  var quizes = 0;
  var comments = 0;
  var avgComments = 0;
  var partialQuizes = 0;
  models.Quiz.count().then(function(count){
    quizes = count;
    models.Comment.count().then(function(count){
      comments = count;
      avgComments = comments != 0 ? comments/quizes : 0;
      models.Quiz.count({ where: ['Comments.id IS NULL'], include: [{model: models.Comment}] }).then(function(count){
        partialQuizes = count;
        var model = {
          statistics: {
            questions: quizes,
            comments: comments,
            commentsavg: avgComments,
            questionswocomment: partialQuizes,
            questionswcomments: quizes - partialQuizes
          },
          errors: []
          };
        res.render('statistics/show', model);
      });
    });
  });
};
