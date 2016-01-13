require("cloud/app.js");

var studySessionOption = AV.Object.extend("StudySessionOption")
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("/votes", function(request, response) {
  var query = new AV.Query(studySessionOption)
  query.find({
    success:function(options){
      res.render('/votes/votes',{
        title:"select your session time",
        options:options
      })
    }
  })
});
