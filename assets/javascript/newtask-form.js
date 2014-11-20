$(function(){

	$("#create-task-form").validate({
		onkeyup: false,
		rules: {
			taskTitle: "required",
			taskDescription: "required"
		},
		messages: {
			taskTitle: "Task title is required.",
			taskDescription: "Task description is required."
		},
		submitHandler: function(form){
			var postData = $(form).serializeArray();
	        $.ajax({
	            url : '/api/task/addTask/',
	            type: "POST",
	            data : postData,
	            success:function(data, textStatus, jqXHR)
	            {
	            	//Success
	            },
	            error: function(jqXHR, textStatus, errorThrown)
	            {
	            	//Fail
	            }
	        });
			return false;
		}
	});

});