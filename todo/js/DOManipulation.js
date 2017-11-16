$d(".addtodo-button").on("click", () => {
  const inp = $d(".hidden")
  inp.removeClass("hidden")
  inp.addClass("shown");
});

$d(".add-todo").on("click", () => {
  const inp = $d("#todo-title");
  const title = inp.array[0].value;
  const todoList = $d(".todo-list");
  const newTodo = $d("<li>");
  const todoTitle = $d("<h1>");
  todoTitle.addClass("todo-title");
  todoTitle.append(`${title}`);
  newTodo.append(todoTitle);
  const subButton = $d("<button>");
  subButton.addClass("subtask-button");
  subButton.append("SUBTASKS");
  newTodo.append(subButton);
  newTodo.addClass("todo-item");
  todoList.append(newTodo);
});

$d(".cleartodo-button").on("click", () => {
  debugger
  $d('.todo-list').empty();
});
