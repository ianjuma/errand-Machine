$(function(){

    var notificationd = $('.notification-d'),
        notificationdClose = $('.notification-d-close');

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
            var formURL = $(form).attr('action');
            var formMethod = $(form).attr('method');
            var postData = $(form).serializeArray();
            postData.push({ name: "userId", value: "1" });
            $.ajax({
                url : formURL,
                type: formMethod,
                data: postData,
                success:function(data, textStatus, jqXHR)
                {
                    form.reset();
                    $(notificationd).removeClass('warning error success');
                    $(notificationd).children('p.notification').text('Your task has been successfully created.');
                    $(notificationd).addClass('show success');
                    setTimeout(function(){
                        $(notificationd).removeClass('show');
                    },3000);
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