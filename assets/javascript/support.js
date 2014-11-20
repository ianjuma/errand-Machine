$(function(){

    var notificationd = $('.notification-d'),
        notificationdClose = $('.notification-d-close');

    $("#support-form").validate({
        onkeyup: false,
        rules: {
            supportTitle: "required",
            supportTicket: "required"
        },
        messages: {
            supportTitle: "Support subject is required.",
            supportTicket: "Description of issue or question is required."
        },
        submitHandler: function(form){
            var formURL = $(form).attr('action');
            var formMethod = $(form).attr('method');
            var postData = $(form).serializeArray();
            $.ajax({
                url : formURL,
                type: formMethod,
                data: postData,
                success:function(data, textStatus, jqXHR)
                {
                    form.reset();
                    $(notificationd).removeClass('warning error success');
                    $(notificationd).children('p.notification').text('Your support ticket has been successfully submited.');
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