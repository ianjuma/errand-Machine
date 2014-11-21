(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['taskdetailed'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n    <div class=\"large-4 columns medium-4 columns payments\">\n        <p class=\"title\"><i class=\"fa fa-money\"></i>Payments - <span class=\"currency\">Kshs</span></p>\n        <ul>\n            <li class=\"data\">Amount:<span>";
  if (helper = helpers.task_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></li>\n            <li class=\"data\">Status:<span class=\"eunpaid-status\"><i class=\"fa fa-times-circle\"></i>Unpaid</span></li>\n            <li class=\"data\">Paid on:<a href=\"#\" class=\"pay-button\"><i class=\"fa fa-check-circle\"></i>Pay now</a></li>\n        </ul>\n    </div>\n    <div class=\"large-4 columns medium-4 columns timings\">\n        <p class=\"title\"><i class=\"fa fa-clock-o\"></i>Timings</p>\n        <ul>\n            <li class=\"data\">Created:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.creation_date), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.creation_date), options)))
    + "</span></li>\n            <li class=\"data\">Started:<span class=\"epending-status\"><i class=\"fa fa-square-o\"></i>Pending</span></li>\n            <li class=\"data\">Completed:<span class=\"epending-status\"><i class=\"fa fa-square-o\"></i>Pending</span></li>\n        </ul>\n    </div>\n    <div class=\"large-4 columns medium-4 columns other\">\n        <a href=\"#\" class=\"large-12 columns medium-12 columns update\">Update</a>\n        <a href=\"#\" class=\"large-12 columns medium-12 columns delete\">Delete</a>\n    </div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hProgress), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n        <div class=\"large-4 columns medium-4 columns payments\">\n            <p class=\"title\"><i class=\"fa fa-money\"></i>Payments - <span class=\"currency\">Kshs</span></p>\n            <ul>\n                <li class=\"data\">Amount:<span>";
  if (helper = helpers.task_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></li>\n                <li class=\"data\">Status:<span class=\"epaid-status\"><i class=\"fa fa-check-circle\"></i>Paid</span></li>\n                <li class=\"data\">Paid on:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n            </ul>\n        </div>\n        <div class=\"large-4 columns medium-4 columns timings\">\n            <p class=\"title\"><i class=\"fa fa-clock-o\"></i>Timings</p>\n            <ul>\n                <li class=\"data\">Created:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n                <li class=\"data\">Started:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n                <li class=\"data\">Completed:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n            </ul>\n        </div>\n        <div class=\"large-4 columns medium-4 columns other\">\n            <p class=\"prompt\">Rate our performance on this task; we value your feedback and use it to better our services.</p>\n            <p class=\"ratewrapper\"><i class=\"ratezero fa fa-star-o\" data-rate=\"0\"></i><i class=\"ratemetre fa fa-star-o\" data-rate=\"1\"></i><i class=\"ratemetre fa fa-star-o\" data-rate=\"2\"></i><i class=\"ratemetre fa fa-star-o\" data-rate='3'></i><i class=\"ratemetre fa fa-star-o\" data-rate=\"4\"></i><i class=\"ratemetre fa fa-star-o\" data-rate=\"5\"></i></p>\n            <a href=\"#\" class=\"large-12 columns medium-12 columns delete\">Delete</a>\n        </div>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hPending), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "\n\n    ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n        <div class=\"large-4 columns medium-4 columns payments\">\n            <p class=\"title\"><i class=\"fa fa-money\"></i>Payments - <span class=\"currency\">Kshs</span></p>\n            <ul>\n                <li class=\"data\">Amount:<span>";
  if (helper = helpers.task_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></li>\n                <li class=\"data\">Status:<span class=\"epaid-status\"><i class=\"fa fa-check-circle\"></i>Paid</span></li>\n                <li class=\"data\">Paid on:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n            </ul>\n        </div>\n        <div class=\"large-4 columns medium-4 columns timings\">\n            <p class=\"title\"><i class=\"fa fa-clock-o\"></i>Timings</p>\n            <ul>\n                <li class=\"data\">Created:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n                <li class=\"data\">Started:<span>"
    + escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},data:data},helper ? helper.call(depth0, (depth0 && depth0.timestamp), options) : helperMissing.call(depth0, "formatDate", (depth0 && depth0.timestamp), options)))
    + "</span></li>\n                <li class=\"data\">Completed:<span class=\"einprogress-status\"><i class=\"fa fa-cog fa-spin\"></i>Ongoing</span></li>\n            </ul>\n        </div>\n        <div class=\"large-4 columns medium-4 columns other\">\n            <i class=\"fa fa-cog fa-spin inprogress\"></i>\n            <p class=\"inprogress\">Ongoing</p>\n        </div>\n    ";
  return buffer;
  }

  buffer += "<h3 class=\"title\">";
  if (helper = helpers.task_title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\n<p class=\"desc\">";
  if (helper = helpers.task_description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hPaid), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hPaid), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hProgress), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<i class=\"fa fa-times-circle close-reveal-modal\"></i>";
  return buffer;
  });
templates['taskstable'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n        <tr data-id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            <td><span class=\"task-title\" data-reveal-id=\"tDetailModal\">";
  if (helper = helpers.task_title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n            <td>";
  if (helper = helpers.task_description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</td>\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hPaid), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hProgress), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hProgress), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tr>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <td class=\"payment\"><a href=\"#\" class=\"unpaid-button\"><i class=\"fa fa-times-circle\"></i>Unpaid - <span data-amount=\"";
  if (helper = helpers.task_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"amount\"></span></a></td>\n                <td class=\"tprogress\"><span class=\"pending-status\"><i class=\"fa fa-square-o\"></i>Pending</span></td>\n                <td><a class=\"edit-button task-edit\"><i class=\"fa fa-pencil-square-o\"></i></a><a class=\"delete-button task-delete\"><i class=\"fa fa-trash-o\"></i></a></td>\n            ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <td class=\"payment\"><span class=\"paid-button\"><i class=\"fa fa-check-circle\"></i>Paid - ";
  if (helper = helpers.task_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n                <td class=\"tprogress\"><span class=\"complete-status\"><i class=\"fa fa-check-square-o\"></i>Complete</span></td>\n                <td><a class=\"delete-button task-delete\"><i class=\"fa fa-trash-o\"></i></a></td>\n            ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hPending), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <td class=\"payment\"><span class=\"paid-button\"><i class=\"fa fa-check-circle\"></i>Paid - ";
  if (helper = helpers.task_amount) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_amount); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></td>\n                    <td class=\"tprogress\"><span class=\"inprogress-status\"><i class=\"fa fa-cog fa-spin\"></i>Ongoing</span></td>\n                    <td><i class=\"fa fa-cog fa-spin inprogress\"></i></td>\n                ";
  return buffer;
  }

  buffer += "<h3>Your ordered tasks</h3>\n<table class=\"tasks-table show-for-medium-up\">\n    <thead>\n        <tr>\n            <th width=\"300\">Task</th>\n            <th width=\"350\">Description</th>\n            <th width=\"200\">Payment - <span class=\"currency\">Kshs</span></th>\n            <th width=\"200\">Progress</th>\n            <th width=\"100\"></th>\n        </tr>\n    </thead>\n    <tbody id=\"tasks-table\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.task), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  });
templates['taskupdate'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n                    <input name=\"taskUrgency\" value=\"URGENT\" id=\"urgent\" type=\"checkbox\" class=\"ctask-urgent\" checked/>\n                ";
  }

  buffer += "<h3>Update task</h3>\n<form class=\"create-task-form\" id=\"update-task-form\" action=\"/api/task/updateTaskById/\" method=\"PUT\" accept-charset=\"utf-8\" name=\"update-task-form\" novalidate=\"novalidate\" data-userid=\"";
  if (helper = helpers.userId) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.userId); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" data-taskid=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n    <div class=\"row\">\n        <div class=\"large-6 columns medium-6 columns\"> \n            <input name=\"taskTitle\" type=\"text\" class=\"task-title ctask-input\" placeholder=\"Name your task\" value=\"";
  if (helper = helpers.task_title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" autocomplete=\"off\"/>\n            <label class=\"error\" for=\"taskTitle\"></label>\n        </div>\n        <div class=\"large-5 large-pull-1 columns medium-5 medium-pull-1 columns show-for-medium-up tinfo-div\">\n            <i class=\"fa fa-support\"></i>\n            <p>Good task names are short, descriptive and easy to remember e.g Pay house bill - File taxes to KRA.</p>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"large-6 columns medium-6 columns\">     \n            <textarea name=\"taskDescription\" placeholder=\"Tell us what you would like done\" class=\"ctask-input\">";
  if (helper = helpers.task_description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.task_description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n            <label class=\"error\" for=\"taskDescription\"></label>\n        </div>\n        <div class=\"large-5 large-pull-1 columns medium-5 medium-pull-1 columns show-for-medium-up tinfo-div\">\n            <i class=\"fa fa-support\"></i>\n            <p>Be as detailed as possible with your task description; consider providing a task due date and a contact person.</p>\n        </div>\n    </div>\n    <div class=\"row urgent-section\">\n        <div class=\"large-6 columns medium-6 columns\">    \n            <label class=\"title\">Is your task urgent?</label>\n            <p class=\"prompt\">Urgent tasks are priced at an extra <span>15% of the final task cost.</span></p>\n            <div class=\"switch small round\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUrgent), {hash:{},inverse:self.program(1, program1, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <label for=\"urgent\"></label>\n                <i class=\"fa fa-check yes\"></i>\n            </div>\n        </div>\n    </div>\n    <button type=\"submit\" class=\"large-3 columns medium-3 columns submit\">Update task</button>\n</form>";
  return buffer;
  });
})();