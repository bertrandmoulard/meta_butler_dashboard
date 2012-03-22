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
_A.claimTemplate = _.template("<div class='claim' id='<%= job.name %>-claim'><%= job.claim %></div>");

_A.positionClaim = function (jobName) {
  var el = $("#" + jobName);
  var y  = parseInt($(el).offset().top + $(el).height() / 2);
  var x = parseInt($(el).offset().left + $(el).width() / 2);
  var claimElement = $("#" + jobName + "-claim");
  claimElement.css("top", parseInt(y - claimElement.height() / 2)).css("left", parseInt(x - claimElement.width() / 2));
};

_A.renderClaim = function (job) {
  if($("#" + job.name + "-claim").length > 0) {
    if(job.claim) {
      $("#" + job.name).css("opacity", ".5");
      $("#" + job.name + "-claim").text(job.claim);
      _A.positionClaim(job.name);
    }
    else {
      $("#" + job.name).css("opacity", "1");
      $("#" + job.name + "-claim").remove();
    }
  }
  else {
    if(job.claim) {
      $("#" + job.name).css("opacity", ".5");
      $("body").append(_A.claimTemplate({job: job}));
      _A.positionClaim(job.name);
    }
  }
};

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
    _A.renderClaim(job);
  });
  $("#refresh").text(parsedJSON.refresh);
};

_A.refresh = function () {
  $.get('http://10.113.192.74/jobs', _A.processJobs);
  setTimeout("_A.refresh()", 5000);
};

$(document).ready(_A.refresh);
