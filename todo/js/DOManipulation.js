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
    const deleteIcon = $d('<i>');
    const titleDiv = $d('<div>');


    titleDiv.addClass('title-div');
    deleteIcon.addClass('fa');
    deleteIcon.addClass('fa-times');
    titleDiv.append(deleteIcon);
    todoTitle.addClass("todo-title");
    todoTitle.append(`${title}`);
    titleDiv.append(todoTitle);


    newTodo.append(titleDiv);


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
