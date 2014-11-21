$(function(){

    var notificationd = $('.notification-d'),
        notificationdClose = $('.notification-d-close'),
        cTaskInput = $('.ctask-input'),
        cTaskUrgent = $('.ctask-urgent')
    ;

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
            var userId = $(form).attr('data-userid');
            postData.push({ name: "userId", value: userId });
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

    cTaskInput.on('focus blur',function(e){
        $(e.target.parentElement.parentElement.children[1]).toggleClass('live');
    });

    cTaskUrgent.on('change', function(e){
        if(cTaskUrgent[0].checked){
            $(e.target.parentElement.previousElementSibling).addClass('live');
        }else{
            $(e.target.parentElement.previousElementSibling).removeClass('live');
        }
    });

});