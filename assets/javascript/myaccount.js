$(function(){

    var notificationd = $('.notification-d'),
        notificationdClose = $('.notification-d-close'),
        updateSettings = $('.update-settings'),
        cancelSettings = $('.cancel-settings'),
        emailForm = $('#email-form');

    $(emailForm).children('.ifirst').val(emailForm.attr('data-email'));

    updateSettings.on('click', function(e){
        update = e.target.dataset.update;
        switch(update){
            case 'email':
                $(e.target).nextAll().addClass('live').siblings('.email-form').children('.ifirst').focus();
            break;
            case 'password':
                $(e.target).parent().addClass('live');
                $(e.target).nextAll().addClass('live');
                $(e.target).siblings('.input').children('.ifirst').focus();
                $(e.target).text('Save');
            break;
            default:
                $(e.target).nextAll().addClass('live').siblings('.email-form').children('.ifirst').focus();
        }
    });

    cancelSettings.on('click', function(e){
        cancel = e.target.dataset.cancel;
        switch(cancel){
            case 'email':
                $(e.target).removeClass('live').siblings('.update-settings').addClass('live').siblings('.email-form').removeClass('live').siblings('.email-form').children('.ifirst').blur();    
                $(e.target).siblings('.email-form').children('.ifirst').val(emailForm.attr('data-email'));
            break;
            case 'password':
                $(e.target).parent().removeClass('live');
                $(e.target).siblings('.update').text('Update');
                $(e.target).removeClass('live');
                $(e.target).siblings('.input').children('.ifirst').blur();
                $(e.target).siblings('.input').children().val('');
            break;
            default:
                 $(e.target).removeClass('live').siblings().removeClass('live').siblings('.email-form').children('.ifirst').blur();    
                $(e.target).siblings('.email-form').children('.ifirst').val(emailForm.attr('data-email'));
        }
    });

    emailForm.validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
            userEmail: {
                required: true,
                email: true
            }
        },
        messages: {
            userEmail: {
                required: 'Your email address is required.',
                email: 'Invalid email address.'
            }
        },
        submitHandler: function(form){
            var formURL = $(form).attr('action');
            var formMethod = $(form).attr('method');
            var postData = $(form).serializeArray();
            var userId = $(form).attr('data-userid');
            $.ajax({
                url : formURL+userId,
                type: formMethod,
                data: postData,
                success:function(data, textStatus, jqXHR)
                {
                    $(emailForm).removeClass('live').siblings('.cancel-settings').removeClass('live').siblings('.update-settings').addClass('live').children('.ifirst').blur();
                    $(emailForm).children('.ifirst').val(postData[0].value);

                    $(notificationd).removeClass('warning error success');
                    $(notificationd).children('p.notification').text('Your email has been successfully updated.');
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