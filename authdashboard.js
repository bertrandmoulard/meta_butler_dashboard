var _A = _A || {};

_A.jobs = ['http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth', 
'http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth-rpmify', 
'http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth-sso-gem', 
'http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth-deploy', 
'http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth-sso-gem-publish', 
'http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth-deploy-esxi', 
'http://ci.cp.vpc.realestate.com.au:8080/job/cp-auth-update-sso-gem-version', 
'http://ci.cp.vpc.realestate.com.au:8080/job/customer-systems-integration'];

_A.jobTemplate = _.template("<article id='<%= job.name %>' class='jenkins_<%= job.color %>'><header><h1><%= job.name %></h1></header></article>")

_A.processJobs = function (data) {
  var parsedJSON = $.parseJSON(data);
  _(_A.jobs).each(function (jobId) {
    var job = parsedJSON.jobs[jobId];
    if($("#" + job.name).length > 0) {
      $("#" + job.name).removeClass().addClass("jenkins_" + job.color);
    }
    else {
      $("body").append(_A.jobTemplate({job: job}));
    }

    $("#refresh").text(parsedJSON.refresh);
  });
};

_A.refresh = function () {
  $.get('http://10.113.192.74/jobs', _A.processJobs);
  setTimeout("_A.refresh()", 5000);
};

$(document).ready(_A.refresh);
