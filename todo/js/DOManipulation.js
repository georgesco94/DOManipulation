$d(()=>{


  let subtasksArray =
  {
    0:['Add Documentation','Contact info','Format entry'],
    1:['Talk to VPR', 'Skype Japan'],
    2:['Tomatos', 'Fruitzz']
  };
  let numTasks = $d('.todo-item').array.length


  $d(".addtodo-button").on("click", () => {
    const addContent = $d(".add-div-content")
    addContent.addClass("shown");
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
    const addContent = $d(".add-div-content")
    addContent.removeClass("shown");
  });

  $d(".cleartodo-button").on("click", () => {
    $d('.todo-list').empty();
    $d('.subtasks').empty();
  });

$d('.todo-list').on('click' , (e) => {
  if($d(e.target).attr('class')[0] === 'f'){
    $d(e.target).parent().parent().remove();
    return;
  }
  let idx = parseInt($d(e.target).attr('key'));
  const substasks = $d('.subtasks');
  substasks.empty();
  const subtasksUl = $d('<ul>');
  subtasksUl.addClass('subtasks-ul');
  subtasksArray[idx].forEach((subt) => {
    const subLi = $d('<li>');
    subLi.append(subt);
    subtasksUl.append(subLi);
  });
  substasks.append(subtasksUl);
});

$d('.todo-list').on('mouseover', (e) => {
  if($d(e.target).attr('class')[0] === 'f') {
    e.target.style.color = 'red';
  }
});
$d('.todo-list').on('mouseout', (e) => {
  if($d(e.target).attr('class')[0] === 'f') {
    e.target.style.color = '#E9E581';
  }
});


});
