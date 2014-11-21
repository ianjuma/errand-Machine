$(function(){

    function loadTasks(){
        userId = $('#tasks-wrapper').attr('data-userid');
        url = '/api/task/getTasksByUserId/'+userId;
        page = $('#t-table-wrapper');
        noTasks = $('#no-tasks');
        tasksTable = Handlebars.templates['taskstable'];

        $.getJSON(url, function(data){
            if(data){
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
            cTaskInput = $('.ctask-input'),
            cTaskUrgent = $('.ctask-urgent'),
            taskTitle = $('.task-title');

        unpaidTask.on('mouseenter', function(e){
            $(e.target.children[0].firstChild).removeClass('fa-times-circle').addClass('fa-check-circle');
            e.target.children[0].childNodes[1].nodeValue = 'Pay now - ';
        });

        unpaidTask.on('mouseleave', function(e){
            $(e.target.children[0].firstChild).removeClass('fa-check-circle').addClass('fa-times-circle');
            e.target.children[0].childNodes[1].nodeValue = 'Unpaid - ';
        });

        taskTitle.on('click', function(e){
            taskId = e.target.parentElement.parentElement.dataset.id
            url = '/api/task/getTaskById/'+taskId;
            page = $('#tDetailModal');
            tasksDetailed = Handlebars.templates['taskdetailed'];

            $.getJSON(url, function(data){
                hData = formatData(data);
                console.log(hData);
                page.html(tasksDetailed(hData));
            });
        });
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