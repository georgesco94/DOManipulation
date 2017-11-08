$l(".addtodo-button").on("click", () => {
  const inp = $l(".hidden")
  inp.removeClass("hidden")
  inp.addClass("shown");
});

$l(".add-todo").on("click", () => {
  const inp = $l("#todo-title");
  const title = inp.array[0].value;
  const todoList = $l(".todo-list");
  const newTodo = $l("<li>");
  const todoTitle = $l("<h1>");
  todoTitle.addClass("todo-title");
  todoTitle.append(`${title}`);
  newTodo.append(todoTitle);
  const subButton = $l("<button>");
  subButton.addClass("subtask-button");
  subButton.append("SUBTASKS");
  newTodo.append(subButton);
  newTodo.addClass("todo-item");
  todoList.append(newTodo);

});
