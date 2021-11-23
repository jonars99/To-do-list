
var allToDos = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/?api_key=204',
    dataType: 'json',
    success: function (result, textStatus) {
      $('#note-list').empty();
      result.tasks.forEach(function (task) {
        $('#note-list').append('<div class="row"><p class="col-xs-8">' + task.content + '</p><button class="delete" data-id="' + task.id + '">Delete</button><input type="checkbox" class="complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '/>');
      });
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
  });

  allToDos();

})