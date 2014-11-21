$(function(){

    function loadTasks(){
        userId = $('#tasks-wrapper').attr('data-userid');
        url = '/api/task/getTasksByUserId/'+userId;
        page = $('#t-table-wrapper');
        noTasks = $('#no-tasks');
        tasksTable = Handlebars.templates['taskstable'];

        $.getJSON(url, function(data){
            if(data.length > 0){
                noTasks.removeClass('live');
                hData = formatData2(data);
                page.html(tasksTable({'task' : hData}));
                tableActions();
            }else{
                noTasks.addClass('live');
            }

        });
    }

    function tableActions(){

        var unpaidTask = $('.unpaid-button').parent(),
            taskTitle = $('.task-title'),
            taskEdit = $('.task-edit'),
            notificationd = $('.notification-d'),
            notificationdClose = $('.notification-d-close')
        ;

        unpaidTask.on('mouseenter', function(e){
            $(e.target.children[0].firstChild).removeClass('fa-times-circle').addClass('fa-check-circle');
            e.target.children[0].childNodes[1].nodeValue = 'Pay now - ';
        });

        unpaidTask.on('mouseleave', function(e){
            $(e.target.children[0].firstChild).removeClass('fa-check-circle').addClass('fa-times-circle');
            e.target.children[0].childNodes[1].nodeValue = 'Unpaid - ';
        });

        taskTitle.on('click', function(e){
            taskId = e.target.parentElement.parentElement.dataset.id;
            url = '/api/task/getTaskById/'+taskId;
            page = $('#tDetailModal');
            taskDetailed = Handlebars.templates['taskdetailed'];

            $.getJSON(url, function(data){
                hData = formatData(data);
                page.html(taskDetailed(hData));
            });
        });

        taskEdit.on('click', function(e){
            taskId = e.target.parentElement.parentElement.parentElement.dataset.id;
            url = '/api/task/getTaskById/'+taskId;
            page = $('#t-table-wrapper');
            taskUpdate = Handlebars.templates['taskupdate'];

            $.getJSON(url, function(data){
                console.log(data);
                page.html(taskUpdate(data));
                updateActions();
            });
        });

        function updateActions(){
            var cTaskInput = $('.ctask-input'),
                cTaskUrgent = $('.ctask-urgent');

            if(cTaskUrgent[0].checked){
                $(cTaskUrgent[0].parentElement.previousElementSibling).addClass('live');
            }else{
                $(cTaskUrgent[0].parentElement.previousElementSibling).removeClass('live');
            }

            $("#update-task-form").validate({
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
                    var taskId = $(form).attr('data-taskid');
                    postData.push({ name: "userId", value: userId });
                    $.ajax({
                        url : formURL+taskId,
                        type: formMethod,
                        data: postData,
                        success:function(data, textStatus, jqXHR)
                        {
                            loadTasks();
                            $(notificationd).removeClass('warning error success');
                            $(notificationd).children('p.notification').text('Your task has been successfully updated.');
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
        }
    }

    function formatData(data){
        vPaid = data.paid;
        switch(vPaid){
            case 'UNPAID':
                data.hPaid = false;
            break;
            case 'PAID':
                data.hPaid = true;
            break;
            default:
        }

        vProgress = data.progress;
        switch(vProgress){
            case 'INPROGRESS':
                data.hProgress = false;
            break;
            case 'COMPLETE':
                data.hProgress = true;
            break;
            case 'PENDING':
                data.hPending = true;
            break;    
            default:

        }
        return data;
    }

    function formatData2(data){
        for(i=0; i <data.length; i++){
            vPaid = data[i].paid;
            switch(vPaid){
                case 'UNPAID':
                    data[i].hPaid = false;
                break;
                case 'PAID':
                    data[i].hPaid = true;
                break;
                default:
            }

            vProgress = data[i].progress;
            switch(vProgress){
                case 'INPROGRESS':
                    data[i].hProgress = false;
                break;
                case 'COMPLETE':
                    data[i].hProgress = true;
                break;
                case 'PENDING':
                    data[i].hPending = true;
                break;
                default:
            }

            description = data[i].task_description;
            count = description.split(" ").length;
            if(count > 15){
                shortDescription = description.slice(0,50);
                data[i].task_description = shortDescription+'...';
            }
        }
        return data;
    }

    Handlebars.registerHelper('formatDate', function(time){
        result = moment(time).fromNow();
        return new Handlebars.SafeString(result);
    });

    loadTasks();
});