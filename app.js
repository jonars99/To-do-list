
var allToDos = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/?api_key=204',
    dataType: 'json',
    success: function (result, textStatus) {
      $('#note-list').empty();
      result.tasks.forEach(function (task) {
        $('#note-list').append('<div class="row todo"><input type="checkbox" class="complete col-auto ms-4" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '/><p class="col-10 my-2">' + task.content + '</p><button class="btn col-auto delete" data-id="' + task.id + '">X</button>');
      });
      $('#todoNumber').html(result.tasks.length);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var addTask = function () {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=204',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new-task').val()
      }
    }),
    success: function (result, textStatus) {
      $('#new-task').val('');
      allToDos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var deleteTask = function (id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=204',
    success: function (result, textStatus) {
      allToDos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var completeTask = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=204',
    dataType: 'json',
    success: function (result, textStatus) {
      allToDos();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var activeTask = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=204',
    dataType: 'json',
    success: function (result, textStatus) {
      allToDos();
    },
    error: function (result, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

$('document').ready(function () {

  $('#add-task').on('submit', function (event) {
    event.preventDefault();
    addTask();
  });

  $(document).on('click', '.delete', function () {
    var id = $(this).data('id');
    deleteTask(id);
  });

  $(document).on('change', '.complete', function () {
    var id = $(this).data('id');
    if (this.checked) {
      completeTask(id);
    }
    else {
      activeTask(id);
    }
  });

  allToDos();

});