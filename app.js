
var allToDos = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/?api_key=204',
    dataType: 'json',
    success: function (result, textStatus) {
      $('#note-list').empty();
      result.tasks.forEach(function (task) {
        var todo = document.createElement('p');
        todo.innerHTML = task.content;
        $('#note-list').append(todo);
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

  allToDos();

})