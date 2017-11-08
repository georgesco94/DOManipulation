$l(".addtodo-button").on("click", () => {
  const inp = $l(".hidden")
  inp.removeClass("hidden")
  inp.addClass("shown");
  const newTodo = $l("<li>");
  newTodo.addClass("todo-item");
  const todoList = $l(".todo-list");
  todoList.append(newTodo);
});

$l(".add-todo").on("click", () => {
  const inp = $l("#todo-title");
  const title = inp.array[0].value;
});
