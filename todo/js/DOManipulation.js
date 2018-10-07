/* global $d */

$d(()=>{
  let subtasksObject =
  {
    0:['Add Documentation','Contact info','Format entry'],
    1:['Talk to VPR', 'Skype Japan'],
    2:['Tomatos', 'Fruitzz']
  };
  let isDark = false;
  const toggleStyleButton = $d('.toggle-style-button');
  toggleStyleButton.on('click', (e) => {
    isDark = !isDark;
    $d('li').toggleClass('dark');
    $d('.todo-list').toggleClass('dark');
    $d('.main-content').toggleClass('dark');
  });

  const playButton = $d(".play-button");
  playButton.on('mouseover', (e) => {
    $d(e.currentTarget).addClass('hovered-button');
  });
  playButton.on('mouseout', (e) => {
    $d(e.currentTarget).removeClass('hovered-button');
  });

  playButton.on('click', () => {

    const modal = $d('.intro-modal');
    modal.addClass('hidden');
  });


  $d(".create-button").on("click", () => {
    const addContent = $d(".add-div-content");
    addContent.addClass("shown");
  });

  $d(".add-todo").on("click", () => {
    const inp = $d("#todo-title");
    const title = inp.array[0].value;

    const tasks = $d("#todo-new-task");
    addTodo( title,tasks );
  });

  $d(".cleartodo-button").on("click", () => {
    $d('.todo-list').empty();
    $d('.subtasks').empty();
  });

  $d('.todo-list').on('click' , (e) => {
    const substasks = $d('.subtasks');
    substasks.empty();
    if($d(e.target).attr('class')[0] === 'f'){
      $d(e.target).parent().parent().remove();
      return;
    }

    let idx = parseInt($d(e.target).attr('key'));
    const subtasksUl = $d('<ul>');
    subtasksUl.addClass('subtasks-ul');
    subtasksObject[idx].forEach((subt) => {
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

  function addTodo( title,tasks ){
    // add tasks
    const arraySubTasks = [...tasks.array].map(task=>{
      return task.value;
    });
    let key = getNumTasks();
    subtasksObject[key] = arraySubTasks;


    const todoList = $d(".todo-list");
    const newTodo = $d("<li>");
    newTodo.attr('key',key);

    const todoTitle = $d("<h1>");
    todoTitle.addClass("todo-title");

    const deleteIcon = $d('<i>');
    deleteIcon.addClass('fa');
    deleteIcon.addClass('fa-times');

    const titleDiv = $d('<div>');
    titleDiv.addClass('title-div');

    titleDiv.append(deleteIcon);
    todoTitle.append(`${title}`);
    titleDiv.append(todoTitle);
    newTodo.append(titleDiv);


    const subButton = createButton( key );

    newTodo.append(subButton);
    newTodo.addClass("todo-item");
    todoList.append(newTodo);
    const addContent = $d(".add-div-content");
    addContent.removeClass("shown");
  }

  function createButton(key){
    const subButton = $d("<button>");
    subButton.addClass("subtask-button");
    if (isDark) subButton.addClass("dark");
    subButton.attr('key',key);
    subButton.append("SUBTASKS");
    return subButton;
  }

  function getNumTasks(){
    return $d('.todo-item').array.length;
  }

});
